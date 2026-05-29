import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin12345", 12);

  await prisma.user.upsert({
    where: { email: "admin@maisonolive.com" },
    update: {
      name: "Tiago M.",
      passwordHash,
      role: UserRole.ADMIN,
    },
    create: {
      name: "Tiago M.",
      email: "admin@maisonolive.com",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@maisonolive.com" },
    update: {
      name: "Sofia Andersen",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
    create: {
      name: "Sofia Andersen",
      email: "customer@maisonolive.com",
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  await prisma.customer.upsert({
    where: { userId: customer.id },
    update: {
      firstName: "Sofia",
      lastName: "Andersen",
      tier: "BRONZE",
    },
    create: {
      userId: customer.id,
      firstName: "Sofia",
      lastName: "Andersen",
      tier: "BRONZE",
    },
  });

  const categories = [
    { name: "Starters", slug: "starters", sortOrder: 1 },
    { name: "Mains", slug: "mains", sortOrder: 2 },
    { name: "Desserts", slug: "desserts", sortOrder: 3 },
    { name: "Drinks", slug: "drinks", sortOrder: 4 },
  ];

  const categoryBySlug = new Map<string, { id: string }>();

  for (const category of categories) {
    const savedCategory = await prisma.menuCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        sortOrder: category.sortOrder,
      },
      create: category,
    });

    categoryBySlug.set(category.slug, savedCategory);
  }

  const menuItems = [
    {
      categorySlug: "starters",
      name: "Burrata & Heirloom Tomatoes",
      slug: "burrata-heirloom-tomatoes",
      description: "Creamy burrata, basil oil, aged balsamic, and toasted sourdough.",
      price: "34.00",
      imageUrl:
        "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      categorySlug: "starters",
      name: "Truffle Mushroom Arancini",
      slug: "truffle-mushroom-arancini",
      description: "Crisp risotto bites with porcini, parmesan, and roasted garlic aioli.",
      price: "28.00",
      imageUrl:
        "https://images.unsplash.com/photo-1625938145744-e380515399ca?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      sortOrder: 2,
    },
    {
      categorySlug: "mains",
      name: "Tuscan Roast Chicken",
      slug: "tuscan-roast-chicken",
      description: "Half chicken with rosemary jus, potato fondant, and seasonal greens.",
      price: "58.00",
      imageUrl:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      categorySlug: "mains",
      name: "Seafood Linguine",
      slug: "seafood-linguine",
      description: "Prawns, mussels, calamari, cherry tomatoes, chili, and white wine sauce.",
      price: "62.00",
      imageUrl:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      categorySlug: "desserts",
      name: "Classic Tiramisu",
      slug: "classic-tiramisu",
      description: "Espresso-soaked ladyfingers, mascarpone cream, and cocoa.",
      price: "24.00",
      imageUrl:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      sortOrder: 1,
    },
    {
      categorySlug: "drinks",
      name: "Yuzu Mint Spritz",
      slug: "yuzu-mint-spritz",
      description: "Yuzu, mint, soda, and a light citrus cordial.",
      price: "18.00",
      imageUrl:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      sortOrder: 1,
    },
  ];

  for (const item of menuItems) {
    const category = categoryBySlug.get(item.categorySlug);

    if (!category) {
      throw new Error(`Missing category for menu item: ${item.name}`);
    }

    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: {
        categoryId: category.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        isFeatured: item.isFeatured,
        sortOrder: item.sortOrder,
      },
      create: {
        categoryId: category.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        isFeatured: item.isFeatured,
        sortOrder: item.sortOrder,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
