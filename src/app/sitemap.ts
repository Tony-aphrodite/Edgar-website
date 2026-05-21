import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviciosintegralesapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/servicios", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/como-funciona", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/tecnicos", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/precios", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contacto", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/terminos", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/privacidad", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/reembolsos", changeFrequency: "yearly" as const, priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
