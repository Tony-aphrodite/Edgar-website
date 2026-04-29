import {
  Layers,
  Sparkles,
  TrendingUp,
  Compass,
  Search,
  PenTool,
  Code2,
  Rocket,
  Check,
} from "lucide-react";

export const services = [
  {
    icon: Layers,
    title: "Diseño Web",
    short: "Sitios modernos, rápidos y optimizados.",
    description:
      "Diseñamos y desarrollamos sitios web a la medida con un enfoque obsesivo en la velocidad, la accesibilidad y la conversión.",
    features: [
      "Diseño UX/UI personalizado",
      "Desarrollo en Next.js o WordPress",
      "Optimización SEO técnica",
      "Velocidad < 1.5s en LCP",
      "Integración con CRM y analítica",
    ],
  },
  {
    icon: Sparkles,
    title: "Branding & Identidad",
    short: "Identidad visual que conecta.",
    description:
      "Construimos identidades visuales coherentes y memorables: desde el logotipo hasta el sistema de marca completo.",
    features: [
      "Investigación de marca",
      "Logotipo y sistema visual",
      "Tipografía y paleta cromática",
      "Manual de marca aplicable",
      "Plantillas para redes sociales",
    ],
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    short: "Crecimiento medible y sostenible.",
    description:
      "Estrategias de adquisición que combinan SEO, contenido, redes sociales y publicidad pagada para hacer crecer tu negocio.",
    features: [
      "Estrategia de canales",
      "Campañas en Meta y Google Ads",
      "SEO on-page y de contenido",
      "Email marketing automatizado",
      "Reportes mensuales claros",
    ],
  },
  {
    icon: Compass,
    title: "Consultoría Estratégica",
    short: "Claridad para decidir mejor.",
    description:
      "Te acompañamos a definir tu estrategia digital, mapear oportunidades y priorizar las inversiones que importan.",
    features: [
      "Auditoría digital integral",
      "Roadmap a 6 y 12 meses",
      "Optimización de conversiones (CRO)",
      "Workshops con tu equipo",
      "Mentoría mensual",
    ],
  },
];

export const process = [
  {
    icon: Search,
    step: "01",
    title: "Descubrimiento",
    description:
      "Conocemos tu marca, tu audiencia y tus objetivos. Investigamos a tu competencia y mapeamos oportunidades.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Estrategia & Diseño",
    description:
      "Definimos un plan a la medida, prototipamos la experiencia y diseñamos cada pantalla con cuidado por el detalle.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Desarrollo",
    description:
      "Construimos con código limpio y herramientas modernas. Validamos rendimiento, accesibilidad y SEO en cada iteración.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Lanzamiento & Soporte",
    description:
      "Desplegamos con cuidado, capacitamos a tu equipo y nos quedamos a tu lado para iterar y crecer.",
  },
];

export const stats = [
  { value: "150+", label: "Proyectos entregados" },
  { value: "60+", label: "Clientes satisfechos" },
  { value: "8 años", label: "De experiencia" },
  { value: "4.9 / 5", label: "Calificación promedio" },
];

export const pricing = [
  {
    name: "Starter",
    price: "599",
    currency: "USD",
    period: "proyecto",
    description:
      "Perfecto para emprendedores que necesitan presencia digital profesional rápidamente.",
    features: [
      "Sitio de hasta 3 páginas",
      "Diseño responsivo a la medida",
      "Formulario de contacto",
      "SEO básico on-page",
      "Integración con Google Analytics",
      "Soporte por 30 días",
    ],
    cta: "Empezar con Starter",
    highlighted: false,
  },
  {
    name: "Profesional",
    price: "1,799",
    currency: "USD",
    period: "proyecto",
    description:
      "El plan más popular para negocios que quieren crecer con bases sólidas.",
    features: [
      "Hasta 8 páginas + blog",
      "Diseño UX/UI personalizado",
      "CMS para que edites tú mismo",
      "SEO técnico avanzado",
      "Integraciones (CRM, email, pagos)",
      "Capacitación de 2 horas",
      "Soporte por 90 días",
    ],
    cta: "Elegir Profesional",
    highlighted: true,
    badge: "Más popular",
  },
  {
    name: "Premium",
    price: "4,500",
    currency: "USD",
    period: "proyecto",
    description:
      "Para empresas que necesitan una solución completa con marketing y branding incluidos.",
    features: [
      "Sitio personalizado sin límite de páginas",
      "Identidad visual completa incluida",
      "Estrategia de marketing 90 días",
      "Campaña inicial de Meta o Google Ads",
      "Optimización de conversiones",
      "Acompañamiento estratégico mensual",
      "Soporte prioritario por 6 meses",
    ],
    cta: "Hablar de Premium",
    highlighted: false,
  },
];

export const testimonials = [
  {
    quote:
      "Edgar Studio transformó nuestra presencia digital. En tres meses pasamos de no aparecer en Google a recibir reservas todos los días desde la web.",
    name: "Lucía Hernández",
    role: "Fundadora",
    company: "Restaurante Mar y Sol",
  },
  {
    quote:
      "Profesionalismo de principio a fin. El diseño es elegante, la velocidad impresionante y, lo mejor, las consultas duplicaron en el primer mes.",
    name: "Andrés Ramírez",
    role: "Director clínico",
    company: "Clínica Dental Sonrisas",
  },
  {
    quote:
      "Más que una agencia, son un socio. Entienden el negocio y proponen soluciones que mueven la aguja, no sólo bonitas láminas.",
    name: "Mariana López",
    role: "CEO",
    company: "Boutique Florencia",
  },
  {
    quote:
      "El equipo es ágil y comunicativo. Lanzamos el sitio en tiempo y la curva de aprendizaje para nuestro equipo fue mínima.",
    name: "Roberto Cárdenas",
    role: "Director de marketing",
    company: "Grupo Aurora",
  },
];

export const faqs = [
  {
    q: "¿Cuánto tarda un proyecto típico?",
    a: "Un proyecto Starter toma de 2 a 3 semanas. Profesional, entre 4 y 6 semanas. Premium, de 8 a 10 semanas. Definimos el plan exacto en la fase de descubrimiento.",
  },
  {
    q: "¿Trabajan con clientes fuera de México?",
    a: "Sí. Atendemos clientes en toda Latinoamérica, Estados Unidos y España. Trabajamos en español e inglés y facturamos en USD o MXN.",
  },
  {
    q: "¿Cómo funcionan los pagos?",
    a: "Para nuevos proyectos, solicitamos 50% al inicio y 50% al lanzamiento. Aceptamos transferencia, tarjeta y pagos seguros vía Stripe. Para retainers mensuales, cobramos a inicio de cada mes.",
  },
  {
    q: "¿Ofrecen soporte después del lanzamiento?",
    a: "Sí. Cada plan incluye un periodo de soporte. Después puedes contratar nuestro plan de mantenimiento mensual desde 199 USD.",
  },
  {
    q: "¿Qué pasa si no quedo satisfecho?",
    a: "Trabajamos con revisiones incluidas en cada fase y un proceso de aprobación claro. Si en los primeros 14 días algo no cumple lo prometido, ajustamos sin costo o reembolsamos según nuestra política.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Por supuesto. Puedes empezar con Starter y crecer hacia Profesional o Premium. Acreditamos lo invertido en el plan inicial.",
  },
];

export const aboutValues = [
  {
    icon: Sparkles,
    title: "Diseño con propósito",
    description:
      "Cada pixel responde a un objetivo de negocio. La estética sirve a la conversión, no al revés.",
  },
  {
    icon: Compass,
    title: "Estrategia primero",
    description:
      "Antes de diseñar, entendemos. Antes de lanzar, validamos. Trabajamos con datos, no con suposiciones.",
  },
  {
    icon: Check,
    title: "Compromiso total",
    description:
      "Tratamos cada proyecto como si fuera nuestro propio negocio. Si tú creces, nosotros crecemos.",
  },
];

export const team = [
  {
    name: "Edgar Vázquez",
    role: "Fundador & Director Creativo",
    bio: "Más de 12 años diseñando marcas y experiencias digitales para startups y empresas establecidas.",
  },
  {
    name: "Daniela Ortiz",
    role: "Directora de Estrategia",
    bio: "Especialista en marketing de crecimiento y optimización de conversiones para e-commerce y SaaS.",
  },
  {
    name: "Carlos Méndez",
    role: "Lead Developer",
    bio: "Ingeniero full-stack obsesionado con la velocidad y la accesibilidad en la web moderna.",
  },
  {
    name: "Sofía Aguilar",
    role: "Diseñadora Senior UX/UI",
    bio: "Diseñadora de producto con foco en investigación de usuarios y diseño de sistemas escalables.",
  },
];

export const clients = [
  "MAR & SOL",
  "SONRISAS",
  "FLORENCIA",
  "GRUPO AURORA",
  "ATELIER",
  "VERTEX",
  "NOVA LAB",
  "CASA TOLEDO",
];
