import { db } from "./db";
import { products } from "@shared/schema";

const seedProducts = [
  {
    name: "Dirty Shirley",
    slug: "dirty-shirley",
    tagline: "Clarified, carbonated, and dangerously smooth.",
    description: "A sophisticated take on the classic Shirley Temple, elevated with premium clarified vodka. Bright grenadine sweetness meets fresh lime and effervescent carbonation for a cocktail that's as beautiful as it is balanced. Crystal clear with a rosy blush, each sip reveals layers of tart citrus and delicate pomegranate.",
    ingredients: "Clarified Vodka, Grenadine, Fresh Lime, Carbonated Water",
    spirit: "Vodka",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "8%",
    imageUrl: "/images/dirty-shirley.png",
    color: "#c94060",
    featured: true,
  },
  {
    name: "Orange Julius",
    slug: "orange-julius",
    tagline: "Creamy citrus indulgence, reimagined.",
    description: "The nostalgic orange cream flavor you remember, transformed into a sophisticated adult indulgence. Smooth vodka melds with fresh-squeezed orange juice and house-made vanilla syrup, creating a velvety, dreamsicle-like cocktail. Rich, creamy, and impossibly smooth with a long vanilla finish.",
    ingredients: "Vodka, Fresh Orange Juice, Vanilla Syrup, Cream",
    spirit: "Vodka",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "8%",
    imageUrl: "/images/orange-julius.png",
    color: "#e8a040",
    featured: true,
  },
  {
    name: "Mezcal Soda",
    slug: "mezcal-soda",
    tagline: "Smoky, bright, and utterly addictive.",
    description: "For those who crave depth and complexity. Premium mezcal brings its signature smokiness, perfectly tempered by bright lemon and a whisper of vanilla syrup. Light, effervescent, and endlessly drinkable with a long, smoldering finish that lingers beautifully.",
    ingredients: "Mezcal, Fresh Lemon, Vanilla Syrup, Soda Water",
    spirit: "Mezcal",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "8%",
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
