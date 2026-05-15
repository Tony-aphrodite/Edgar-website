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
  metadataBase: new URL("https://servitec.mx"),
  title: {
    default: "ServiTec — Técnicos verificados a domicilio en México",
    template: "%s | ServiTec",
  },
  description:
    "ServiTec conecta a clientes con técnicos verificados de electricidad, plomería, limpieza, pintura, carpintería, cerrajería, aire acondicionado, electrodomésticos y jardinería. Solicita, recibe cotización y paga seguro desde la app.",
  keywords: [
    "servicios a domicilio",
    "técnicos verificados",
    "electricista a domicilio",
    "plomero a domicilio",
    "limpieza a domicilio",
    "reparaciones del hogar",
    "México",
    "ServiTec",
  ],
  authors: [{ name: "ServiTec" }],
  creator: "ServiTec",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://servitec.mx",
    siteName: "ServiTec",
    title: "ServiTec — Técnicos verificados a domicilio",
    description:
      "Solicita técnicos verificados de confianza para tu hogar. Cotización clara y pago seguro en la app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiTec — Técnicos verificados a domicilio",
    description:
      "Solicita técnicos verificados de confianza para tu hogar. Pago seguro en la app.",
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
