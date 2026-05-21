import { PrismaClient } from "@prisma/client";

// Idempotent catalog seed. Run with: npm run db:seed
//
// We deliberately do NOT import from "@/lib/data" because that module imports
// lucide-react icons which require a React/JSX environment. Instead we keep
// the canonical slug + title list here. Update both when adding categories.

const prisma = new PrismaClient();

const categories = [
  { slug: "electricidad", name: "Electricidad", description: "Instalación y reparación eléctrica residencial." },
  { slug: "plomeria", name: "Plomería", description: "Fugas, destapes e instalaciones hidráulicas." },
  { slug: "limpieza", name: "Limpieza", description: "Limpieza profunda residencial y de oficinas." },
  { slug: "pintura", name: "Pintura", description: "Pintura interior y exterior." },
  { slug: "carpinteria", name: "Carpintería", description: "Mobiliario y reparaciones en madera." },
  { slug: "cerrajeria", name: "Cerrajería", description: "Aperturas, cambio de chapas y duplicado de llaves." },
  { slug: "aire-acondicionado", name: "Aire acondicionado", description: "Instalación, mantenimiento y reparación de minisplits." },
  { slug: "electrodomesticos", name: "Electrodomésticos", description: "Reparación de electrodomésticos de línea blanca." },
  { slug: "jardineria", name: "Jardinería", description: "Mantenimiento de áreas verdes." },
];

async function main() {
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    await prisma.serviceCategory.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        description: c.description,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: c.slug,
        name: c.name,
        description: c.description,
        sortOrder: i,
        isActive: true,
      },
    });
    console.log(`upserted category: ${c.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
