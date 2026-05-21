import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/lib/env";
import crypto from "node:crypto";

// S3-compatible object storage abstraction. Works with AWS S3, Cloudflare R2,
// Backblaze B2, MinIO, etc. We presign uploads from the server so the browser
// can PUT directly to the bucket without ever touching our server with the
// raw bytes.

let _client: S3Client | null = null;

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Object storage not configured (S3_*).");
    this.name = "StorageNotConfiguredError";
  }
}

function ensureConfigured() {
  if (!env.S3_ENDPOINT || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY || !env.S3_BUCKET) {
    throw new StorageNotConfiguredError();
  }
}

function getClient(): S3Client {
  ensureConfigured();
  if (!_client) {
    _client = new S3Client({
      region: env.S3_REGION || "auto",
      endpoint: env.S3_ENDPOINT,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true, // required for R2/MinIO; AWS S3 accepts it too.
    });
  }
  return _client;
}

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export type UploadKind = "service-photo" | "tecnico-kyc";

export type SignedUpload = {
  key: string;
  uploadUrl: string;
  publicUrl: string;
  expiresIn: number;
};

/**
 * Presign a PUT URL for the given kind. The caller writes the bytes
 * directly to the bucket and then submits the returned `key` to the
 * domain endpoint (e.g. service request creation).
 */
export async function signUpload({
  kind,
  contentType,
  ownerId,
  contentLength,
}: {
  kind: UploadKind;
  contentType: string;
  ownerId: string;
  contentLength: number;
}): Promise<SignedUpload> {
  ensureConfigured();
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    throw new Error(`content type not allowed: ${contentType}`);
  }
  if (contentLength <= 0 || contentLength > MAX_BYTES) {
    throw new Error(`content length out of range`);
  }

  const id = crypto.randomBytes(16).toString("hex");
  const ext = contentTypeExtension(contentType);
  const key = `${kind}/${ownerId}/${id}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: contentLength,
  });
  const uploadUrl = await getSignedUrl(getClient(), command, { expiresIn: 5 * 60 });

  const publicBase = env.S3_PUBLIC_URL || `${env.S3_ENDPOINT}/${env.S3_BUCKET}`;
  return {
    key,
    uploadUrl,
    publicUrl: `${publicBase.replace(/\/$/, "")}/${key}`,
    expiresIn: 5 * 60,
  };
}

export async function deleteObject(key: string): Promise<void> {
  ensureConfigured();
  await getClient().send(new DeleteObjectCommand({ Bucket: env.S3_BUCKET, Key: key }));
}

function contentTypeExtension(ct: string): string {
  switch (ct) {
    case "image/jpeg": return "jpg";
    case "image/png": return "png";
    case "image/webp": return "webp";
    case "image/heic": return "heic";
    case "application/pdf": return "pdf";
    default: return "bin";
  }
}
