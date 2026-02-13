import { db } from "./db";
import { products } from "@shared/schema";

const seedProducts = [
  {
    name: "Dirty Shirley",
    slug: "dirty-shirley",
    tagline: "Clarified, carbonated, and dangerously smooth.",
    description: "A sophisticated take on the classic Shirley Temple, elevated with premium vodka. The entire cocktail is clarified to a stunning translucent strawberry hue, then carbonated for a crisp, effervescent finish. Bright grenadine sweetness meets fresh lime in a sparkling cocktail that looks like liquid jewels and drinks like velvet.",
    ingredients: "Vodka, Grenadine, Fresh Lime, Carbonated",
    spirit: "Vodka",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/dirty-shirley.png",
    color: "#c94060",
    featured: true,
  },
  {
    name: "Orange Julius",
    slug: "orange-julius",
    tagline: "Creamy citrus indulgence, clarified and sparkling.",
    description: "The nostalgic orange cream flavor you remember, transformed into a crystal-clear sparkling indulgence. The entire cocktail is clarified to a pale, luminous gold reminiscent of fine white wine, then carbonated for lively effervescence. Vodka melds with fresh orange juice and house-made vanilla syrup, delivering dreamsicle flavors in a remarkably elegant, sparkling form.",
    ingredients: "Vodka, Fresh Orange Juice, Vanilla Syrup, Carbonated",
    spirit: "Vodka",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/orange-julius.png",
    color: "#e8a040",
    featured: true,
  },
  {
    name: "Mezcal Soda",
    slug: "mezcal-soda",
    tagline: "Smoky, bright, and brilliantly clear.",
    description: "For those who crave depth and complexity. Premium mezcal brings its signature smokiness, perfectly tempered by bright lemon and a whisper of vanilla syrup. The entire cocktail is clarified to a pristine pale gold, like a fine white wine, then carbonated for a crisp, sparkling finish. Endlessly drinkable with a long, smoldering finish that lingers beautifully.",
    ingredients: "Mezcal, Fresh Lemon, Vanilla Syrup, Carbonated",
    spirit: "Mezcal",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/mezcal-soda.png",
    color: "#c4a050",
    featured: true,
  },
];

export async function seedDatabase() {
  const existing = await db.select().from(products);
  if (existing.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database with products...");
  for (const product of seedProducts) {
    await db.insert(products).values(product);
  }
  console.log("Seeding complete!");
}
