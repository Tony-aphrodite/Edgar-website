import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edgarstudio.mx"),
  title: {
    default: "Edgar Studio — Diseño web, branding y marketing digital",
    template: "%s | Edgar Studio",
  },
  description:
    "Edgar Studio es una agencia digital que diseña marcas, sitios web y campañas de marketing que convierten. Trabajamos con emprendedores y empresas en México y Latinoamérica.",
  keywords: [
    "agencia digital",
    "diseño web",
    "branding",
    "marketing digital",
    "SEO",
    "México",
    "Edgar Studio",
  ],
  authors: [{ name: "Edgar Studio" }],
  creator: "Edgar Studio",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://edgarstudio.mx",
    siteName: "Edgar Studio",
    title: "Edgar Studio — Diseño web, branding y marketing digital",
    description:
      "Diseñamos marcas y experiencias digitales que convierten. Agencia digital en México.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edgar Studio — Agencia digital",
    description:
      "Diseñamos marcas y experiencias digitales que convierten.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} font-sans antialiased bg-background text-ink-900`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
