// Datos de la marca y del negocio. Los valores fiscales corresponden a la
// Constancia de Situación Fiscal del titular (RFC GOME900115AA4). La
// plataforma opera como persona física; se actualizará a persona moral
// (S.A. de C.V.) en una fase posterior.
export const site = {
  name: "ServiTec",
  legalName: "Edgar Daniel Godoy Montalvo",
  tagline:
    "Técnicos de confianza para tu hogar, a un toque de distancia.",
  description:
    "ServiTec es una plataforma de servicios a domicilio que conecta a clientes con técnicos verificados de electricidad, plomería, limpieza, pintura, carpintería, cerrajería, aire acondicionado, electrodomésticos y jardinería en México.",
  email: "servitec@serviciosintegralesapp.com",
  supportEmail: "servitec@serviciosintegralesapp.com",
  techniciansEmail: "servitec@serviciosintegralesapp.com",
  privacyEmail: "servitec@serviciosintegralesapp.com",
  phone: "+52 833 154 5487",
  whatsapp: "+52 833 154 5487",
  address: {
    street: "Calle Benito Juárez 801, Col. Barandillas",
    city: "Tampico",
    state: "Tamaulipas",
    zip: "89180",
    country: "México",
  },
  rfc: "GOME900115AA4",
  founded: "2024",
  coverage:
    "Ciudad de México y zona metropolitana del Valle de México (ZMVM).",
  hours: "Atención al cliente: lunes a sábado, 8:00 – 16:00 (CDMX)",
  url: "https://serviciosintegralesapp.com",
  // Estructura económica de la plataforma. Se publica en el sitio para
  // cumplir con los requisitos de transparencia de Stripe (marketplace).
  commission: {
    rate: 12, // %
    note: "Comisión cobrada al técnico sobre cada servicio completado.",
  },
  appLinks: {
    // PENDIENTE: enlaces reales a las tiendas cuando la app esté publicada.
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
