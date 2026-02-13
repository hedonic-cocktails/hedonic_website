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
  {
    name: "Whiskey Sour",
    slug: "whiskey-sour",
    tagline: "Bold, bright, and beautifully balanced.",
    description: "The timeless whiskey sour, perfected and clarified. Premium whiskey meets fresh lemon juice and house-made sugar syrup, then the entire cocktail is clarified to a luminous amber gold. Carbonated for a crisp, sparkling lift that opens up the whiskey's caramel depth. Bold enough to respect the spirit, bright enough to keep you coming back.",
    ingredients: "Whiskey, Fresh Lemon, Sugar Syrup, Carbonated",
    spirit: "Whiskey",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/whiskey-sour.png",
    color: "#d4a340",
    featured: true,
  },
  {
    name: "Strawberry Daiquiri",
    slug: "strawberry-daiquiri",
    tagline: "Sun-kissed sweetness, impossibly clear.",
    description: "Forget the frozen slush — this is the daiquiri reborn. Premium rum and ripe strawberries are balanced with fresh lime, then the entire cocktail is clarified to a breathtaking rose-pink transparency. Carbonated for an effervescent finish that dances on the palate. Every sip is summer in a glass, elegant and endlessly refreshing.",
    ingredients: "Rum, Strawberry, Fresh Lime, Carbonated",
    spirit: "Rum",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/strawberry-daiquiri.png",
    color: "#e05878",
    featured: true,
  },
  {
    name: "Clover Club",
    slug: "clover-club",
    tagline: "Refined raspberry elegance, sparkling and clear.",
    description: "A pre-Prohibition classic revived with modern technique. London dry gin meets fresh raspberries and bright lemon, then the entire cocktail is clarified to a stunning translucent blush. Carbonated for a lively, effervescent texture. Tart, botanical, and impossibly smooth — a cocktail that proves sophistication and pleasure are the same thing.",
    ingredients: "Gin, Raspberry, Fresh Lemon, Carbonated",
    spirit: "Gin",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/clover-club.png",
    color: "#c44870",
    featured: true,
  },
  {
    name: "Pheromone Martini",
    slug: "pheromone-martini",
    tagline: "Dark, exotic, and irresistibly seductive.",
    description: "Our most provocative creation. Premium bourbon meets tropical passionfruit and a whisper of dark chocolate, then the entire cocktail is clarified to a mysterious, pale amber. Carbonated for a silky effervescence that carries waves of exotic fruit and rich cacao. Intoxicating in every sense — a cocktail that pulls you in and doesn't let go.",
    ingredients: "Bourbon, Passionfruit, Dark Chocolate, Carbonated",
    spirit: "Bourbon",
    price: "29.99",
    volume: "750mL",
    servings: 4,
    abv: "12.5%",
    imageUrl: "/images/pheromone-martini.png",
    color: "#b8864e",
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
