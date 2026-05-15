import {
  Zap,
  Wrench,
  SprayCan,
  Paintbrush,
  Hammer,
  Key,
  Snowflake,
  Plug,
  Leaf,
  ClipboardList,
  FileText,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  LockKeyhole,
  MapPin,
  Headphones,
} from "lucide-react";

// --- Categorías de servicios disponibles en la app ServiTec --------------
// Los íconos vienen de lucide-react; los slugs se usan como anclas en
// /servicios#electricidad, etc.
export const services = [
  {
    slug: "electricidad",
    icon: Zap,
    title: "Electricidad",
    short: "Instalación y reparación eléctrica residencial.",
    description:
      "Diagnóstico, instalación y reparación de circuitos, contactos, apagadores, lámparas, centros de carga y cableado en hogares y oficinas.",
    examples: [
      "Cambio de contactos y apagadores",
      "Instalación de lámparas y candiles",
      "Diagnóstico de cortos y fallas",
      "Cableado y centros de carga",
      "Instalación de no-breaks",
    ],
  },
  {
    slug: "plomeria",
    icon: Wrench,
    title: "Plomería",
    short: "Fugas, destapes e instalaciones hidráulicas.",
    description:
      "Reparación de fugas, destape de coladeras y tuberías, instalación de muebles de baño, calentadores y bombas de agua.",
    examples: [
      "Reparación de fugas en tuberías",
      "Destape de coladeras y W.C.",
      "Instalación de calentadores",
      "Cambio de llaves y mezcladoras",
      "Mantenimiento de cisternas",
    ],
  },
  {
    slug: "limpieza",
    icon: SprayCan,
    title: "Limpieza",
    short: "Limpieza profunda residencial y de oficinas.",
    description:
      "Limpieza general, profunda, post-obra y de mantenimiento para hogares, departamentos y oficinas, con productos y equipo propios.",
    examples: [
      "Limpieza profunda de hogar",
      "Limpieza post-obra",
      "Lavado de sillones y alfombras",
      "Limpieza de oficinas",
      "Mantenimiento periódico",
    ],
  },
  {
    slug: "pintura",
    icon: Paintbrush,
    title: "Pintura",
    short: "Pintura de interiores, exteriores y acabados.",
    description:
      "Aplicación de pintura vinílica, esmalte y acabados especiales en muros, plafones, rejas y herrería, con preparación de superficies.",
    examples: [
      "Pintura de interiores",
      "Pintura de fachadas",
      "Resanes y texturas",
      "Esmalte en herrería",
      "Recubrimientos impermeables",
    ],
  },
  {
    slug: "carpinteria",
    icon: Hammer,
    title: "Carpintería",
    short: "Muebles, puertas y reparaciones en madera.",
    description:
      "Reparación, instalación y fabricación a medida de muebles, closets, puertas, herrajes y trabajos en madera para hogar y oficina.",
    examples: [
      "Reparación de puertas",
      "Instalación de closets",
      "Muebles a la medida",
      "Cambio de chapas y herrajes",
      "Resanes y barnizado",
    ],
  },
  {
    slug: "cerrajeria",
    icon: Key,
    title: "Cerrajería",
    short: "Cerraduras, copias y apertura de emergencia.",
    description:
      "Cambio e instalación de cerraduras, duplicado de llaves y servicio de apertura de puertas para hogar y automóvil.",
    examples: [
      "Cambio de cerraduras",
      "Apertura de emergencia",
      "Duplicado de llaves",
      "Cerraduras inteligentes",
      "Refuerzo de seguridad",
    ],
  },
  {
    slug: "aire-acondicionado",
    icon: Snowflake,
    title: "Aire acondicionado",
    short: "Instalación y mantenimiento de minisplits.",
    description:
      "Instalación, mantenimiento, recarga de gas y reparación de equipos de aire acondicionado tipo minisplit y ventana.",
    examples: [
      "Instalación de minisplits",
      "Mantenimiento preventivo",
      "Recarga de gas refrigerante",
      "Reparación de fallas",
      "Limpieza profunda",
    ],
  },
  {
    slug: "electrodomesticos",
    icon: Plug,
    title: "Electrodomésticos",
    short: "Reparación de línea blanca y aparatos.",
    description:
      "Diagnóstico y reparación de refrigeradores, lavadoras, secadoras, estufas, hornos y otros aparatos electrodomésticos.",
    examples: [
      "Reparación de refrigeradores",
      "Lavadoras y secadoras",
      "Estufas y hornos",
      "Calentadores eléctricos",
      "Pequeños electrodomésticos",
    ],
  },
  {
    slug: "jardineria",
    icon: Leaf,
    title: "Jardinería",
    short: "Mantenimiento de jardines y áreas verdes.",
    description:
      "Poda, corte de pasto, fumigación, diseño de jardines y mantenimiento periódico de áreas verdes residenciales.",
    examples: [
      "Corte y mantenimiento de pasto",
      "Poda de árboles y arbustos",
      "Diseño de jardines",
      "Fumigación y control de plagas",
      "Sistemas de riego",
    ],
  },
];

// --- Flujo para clientes en la app ---------------------------------------
export const clientProcess = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Solicita el servicio",
    description:
      "Describe el problema, sube fotos y comparte tu ubicación desde la app. La solicitud llega a los técnicos verificados de tu zona.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Recibe una cotización",
    description:
      "El técnico revisa tu solicitud y te envía una cotización clara: mano de obra, materiales y piezas, sin sorpresas.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Aprueba y agenda",
    description:
      "Si te convence, apruebas la cotización y agendan el día y hora. El técnico llega puntual y realiza el trabajo.",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Paga seguro en la app",
    description:
      "Pagas con tarjeta dentro de la app mediante Stripe. Recibes comprobante y, si lo necesitas, factura CFDI emitida por el técnico.",
  },
];

// --- Flujo para técnicos --------------------------------------------------
export const technicianProcess = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Regístrate gratis",
    description:
      "Descarga la app, crea tu perfil, elige tus categorías y zonas de cobertura. Registrarse no tiene costo ni mensualidad.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Verifica tu identidad",
    description:
      "Sube tu INE, comprobante de domicilio, RFC y constancia de situación fiscal. Validamos cada técnico antes de activarlo.",
  },
  {
    icon: Headphones,
    step: "03",
    title: "Recibe solicitudes",
    description:
      "Cuando un cliente solicite un servicio en tu zona y categoría, recibirás la notificación en la app para cotizar.",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Cobra y crece",
    description:
      "Al completar el servicio, el pago del cliente se libera en tu cuenta vía Stripe Connect. La plataforma descuenta una comisión transparente.",
  },
];

// Alias retro-compatible: si algún componente importa `process`, sigue
// funcionando con el flujo del cliente como flujo principal.
export const process = clientProcess;

// --- Razones para elegir ServiTec (sustituye testimonios falsos) ---------
export const valueProps = [
  {
    icon: BadgeCheck,
    title: "Técnicos verificados",
    description:
      "Cada técnico pasa por un proceso de validación de identidad y documentos antes de poder ofrecer servicios en la plataforma.",
  },
  {
    icon: LockKeyhole,
    title: "Pago seguro en la app",
    description:
      "El pago se procesa por Stripe y se libera al técnico al completar el servicio. Tus datos de tarjeta nunca se comparten.",
  },
  {
    icon: FileText,
    title: "Cotización transparente",
    description:
      "Antes de aprobar un servicio recibes una cotización con mano de obra, materiales y piezas desglosados. Sin letras pequeñas.",
  },
  {
    icon: Headphones,
    title: "Soporte humano",
    description:
      "Si algo no sale como esperabas, nuestro equipo de soporte te acompaña hasta resolverlo. Estamos disponibles toda la semana.",
  },
  {
    icon: MapPin,
    title: "Cobertura local",
    description:
      "Conectamos con técnicos cercanos para que el tiempo de respuesta y traslado sea el mínimo posible.",
  },
  {
    icon: ShieldCheck,
    title: "Factura CFDI disponible",
    description:
      "Si el técnico es persona física o moral con obligaciones fiscales activas, puedes solicitar tu factura CFDI directo desde la app.",
  },
];

// --- Indicadores de confianza (sin números inflados) ---------------------
export const trustSignals = [
  {
    title: "100% verificados",
    description: "Identidad, domicilio y situación fiscal validados antes de activarse.",
  },
  {
    title: "Pago en la app",
    description: "Procesado por Stripe con liberación al completar el trabajo.",
  },
  {
    title: "Sin mensualidades",
    description: "Para clientes y técnicos: ServiTec solo cobra al cerrarse un servicio.",
  },
  {
    title: "Soporte 7 días",
    description: "Atención al cliente de lunes a sábado, con guardias el domingo.",
  },
];

// --- Planes / estructura de comisión -------------------------------------
// La plataforma no vende paquetes a clientes finales. Estos "planes"
// describen quién paga qué, para cumplir los requisitos de transparencia
// que pide Stripe a marketplaces.
export const pricingPlans = [
  {
    name: "Para clientes",
    audience: "cliente",
    headline: "Gratis",
    sub: "Descargar y solicitar",
    description:
      "Descargar la app, crear tu cuenta y solicitar cotizaciones es completamente gratis. Solo pagas el servicio cuando aprueba la cotización del técnico.",
    features: [
      "Sin mensualidades ni cuotas de registro",
      "Cotización gratis antes de aprobar",
      "Pago seguro con tarjeta vía Stripe",
      "Comprobante y, si aplica, CFDI emitido por el técnico",
      "Soporte humano si algo no sale bien",
    ],
    cta: "Descargar la app",
    ctaHref: "#descargar",
    highlighted: false,
  },
  {
    name: "Para técnicos",
    audience: "tecnico",
    headline: "12% de comisión",
    sub: "por servicio completado",
    description:
      "Registrarte y mantener tu perfil activo no tiene costo. ServiTec retiene una comisión del 12% sobre cada servicio que cobres a través de la plataforma.",
    features: [
      "Registro y publicación de perfil sin costo",
      "Sin mensualidades ni cargos fijos",
      "Comisión transparente del 12% por servicio",
      "Cobro automático con Stripe Connect",
      "CFDI de comisión emitido por ServiTec al técnico",
      "Acompañamiento en validación de identidad y RFC",
    ],
    cta: "Quiero trabajar como técnico",
    ctaHref: "/tecnicos",
    highlighted: true,
    badge: "Modelo marketplace",
  },
  {
    name: "Empresas",
    audience: "empresa",
    headline: "A la medida",
    sub: "convenios corporativos",
    description:
      "Edificios, administradoras, inmobiliarias y empresas con múltiples inmuebles pueden contratar servicios recurrentes con condiciones comerciales especiales.",
    features: [
      "Cuenta multi-inmueble",
      "Facturación consolidada",
      "Técnicos asignados por zona",
      "Reportes y bitácora de servicios",
      "Tiempos de respuesta acordados (SLA)",
    ],
    cta: "Hablar con ventas",
    ctaHref: "/contacto",
    highlighted: false,
  },
];

// Alias retro-compatible para componentes que importen `pricing`.
export const pricing = pricingPlans;

// --- Preguntas frecuentes -------------------------------------------------
export const faqs = [
  {
    q: "¿Cómo solicito un servicio?",
    a: "Descarga la app de ServiTec, crea tu cuenta con tu correo o teléfono, elige la categoría de servicio que necesitas (electricidad, plomería, limpieza, etc.), describe el problema, sube fotos si lo deseas y comparte tu ubicación. En minutos recibirás cotizaciones de técnicos verificados de tu zona.",
  },
  {
    q: "¿Cómo se calcula el precio de un servicio?",
    a: "ServiTec funciona con cotización: el técnico revisa tu solicitud y te envía un presupuesto que desglosa mano de obra, materiales y piezas. Tú decides si aprobarlo antes de que comience el trabajo. No hay sorpresas ni cargos adicionales una vez aprobada la cotización.",
  },
  {
    q: "¿Cómo se paga?",
    a: "El pago se realiza dentro de la app con tarjeta de crédito o débito, procesado de forma segura por Stripe. El monto queda retenido hasta que el servicio se complete y se libera al técnico mediante Stripe Connect. ServiTec descuenta automáticamente su comisión.",
  },
  {
    q: "¿Puedo recibir factura?",
    a: "Sí. Si el técnico que realiza el servicio está inscrito en el RFC y emite CFDI, puedes solicitar tu factura directamente desde la app. El comprobante fiscal lo emite el técnico a su nombre por el monto total del servicio. ServiTec emite por separado un CFDI al técnico por la comisión cobrada.",
  },
  {
    q: "¿Qué pasa si el trabajo no queda bien?",
    a: "Tienes 24 horas después de completado el servicio para reportar inconformidades desde la app. Nuestro equipo de soporte revisa el caso, contacta al técnico y, si procede, aplica el reembolso correspondiente según la Política de reembolsos. Consulta los detalles en /reembolsos.",
  },
  {
    q: "¿Cómo verifican a los técnicos?",
    a: "Antes de activarse, cada técnico pasa por un proceso de verificación: identificación oficial (INE), comprobante de domicilio, RFC y constancia de situación fiscal. También validamos sus datos para depósitos a través de Stripe Connect.",
  },
  {
    q: "¿Cuánto cobra ServiTec a los técnicos?",
    a: "ServiTec cobra una comisión del 12% sobre cada servicio completado y pagado a través de la plataforma. No hay mensualidades, cuotas de registro ni cargos por publicación de perfil. La comisión se descuenta automáticamente al momento del cobro.",
  },
  {
    q: "¿En qué zonas opera ServiTec?",
    a: "Actualmente operamos en la Ciudad de México y zona metropolitana del Valle de México. Estamos expandiendo cobertura — si tu zona aún no aparece en la app, déjanos tu correo y te avisaremos cuando lleguemos.",
  },
];

// --- Misión / valores ----------------------------------------------------
export const aboutValues = [
  {
    icon: BadgeCheck,
    title: "Confianza, primero",
    description:
      "Verificamos a cada técnico y cuidamos cada pago para que solicitar un servicio en casa deje de dar miedo.",
  },
  {
    icon: LockKeyhole,
    title: "Transparencia en cada paso",
    description:
      "Cotización clara, comisión publicada, factura disponible. Lo que ves es lo que pagas.",
  },
  {
    icon: Headphones,
    title: "Personas, no tickets",
    description:
      "Detrás de cada servicio hay un técnico que sostiene a su familia y un cliente con un problema real. Operamos con ese respeto.",
  },
];

// Equipos visibles públicamente — se mantiene vacío hasta tener perfiles
// reales que publicar. La página /nosotros (o /como-funciona) ya no
// muestra equipo ficticio.
export const team: { name: string; role: string; bio: string }[] = [];

// Lista de "clientes". En un marketplace de servicios no hay clientes
// corporativos que mostrar como logos — sustituimos por las categorías de
// servicio para el marquee del Hero.
export const clients = [
  "ELECTRICIDAD",
  "PLOMERÍA",
  "LIMPIEZA",
  "PINTURA",
  "CARPINTERÍA",
  "CERRAJERÍA",
  "AIRE ACONDICIONADO",
  "ELECTRODOMÉSTICOS",
  "JARDINERÍA",
];
