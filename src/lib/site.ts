// Datos de la marca y del negocio. Reemplaza los valores marcados como
// PLACEHOLDER por la información legal y de contacto reales antes de
// solicitar la activación de Stripe Connect y Facturapi.
export const site = {
  name: "ServiTec",
  legalName: "ServiTec México S.A. de C.V.", // PLACEHOLDER: razón social registrada
  tagline:
    "Técnicos de confianza para tu hogar, a un toque de distancia.",
  description:
    "ServiTec es una plataforma de servicios a domicilio que conecta a clientes con técnicos verificados de electricidad, plomería, limpieza, pintura, carpintería, cerrajería, aire acondicionado, electrodomésticos y jardinería en México.",
  email: "hola@servitec.mx", // PLACEHOLDER
  supportEmail: "soporte@servitec.mx", // PLACEHOLDER
  techniciansEmail: "tecnicos@servitec.mx", // PLACEHOLDER
  privacyEmail: "privacidad@servitec.mx", // PLACEHOLDER
  phone: "+52 55 0000 0000", // PLACEHOLDER
  whatsapp: "+52 55 0000 0000", // PLACEHOLDER
  address: {
    street: "Av. Insurgentes Sur 1234, Piso 5", // PLACEHOLDER
    city: "Benito Juárez",
    state: "Ciudad de México",
    zip: "03100",
    country: "México",
  },
  rfc: "SME000000XX0", // PLACEHOLDER: RFC de la persona moral
  founded: "2024",
  coverage:
    "Ciudad de México y zona metropolitana del Valle de México (ZMVM).",
  social: {
    instagram: "https://instagram.com/servitec.mx",
    facebook: "https://facebook.com/servitec.mx",
    tiktok: "https://tiktok.com/@servitec.mx",
    linkedin: "https://linkedin.com/company/servitec-mx",
  },
  hours: "Atención al cliente: lunes a sábado, 8:00 – 20:00 (CDMX)",
  url: "https://servitec.mx", // PLACEHOLDER: URL pública real
  // Estructura económica de la plataforma. Se publica en el sitio para
  // cumplir con los requisitos de transparencia de Stripe (marketplace).
  commission: {
    rate: 12, // %
    note: "Comisión cobrada al técnico sobre cada servicio completado.",
  },
  appLinks: {
    // PLACEHOLDER: enlaces reales a las tiendas cuando la app esté publicada.
    ios: "#",
    android: "#",
  },
};

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Para técnicos", href: "/tecnicos" },
  { label: "Precios y comisiones", href: "/precios" },
  { label: "Contacto", href: "/contacto" },
];
