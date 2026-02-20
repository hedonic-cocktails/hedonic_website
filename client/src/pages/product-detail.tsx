import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

const LOVINGLY_LIGHT = ["dirty-shirley", "orange-julius", "strawberry-daiquiri", "clover-club"];
const DARK_AND_SEDUCTIVE = ["mezcal-soda", "whiskey-sour", "pheromone-martini", "negroni-sbagliato"];
const TROPICAL_PARADISE = ["jungle-bird", "painkiller", "paloma", "mai-tai"];
const PACKS = ["lovingly-light", "dark-and-seductive", "tropical-paradise"];

function getCollection(slug: string): { name: string; slugs: string[] } | null {
  if (LOVINGLY_LIGHT.includes(slug)) return { name: "Lovingly Light", slugs: LOVINGLY_LIGHT };
  if (DARK_AND_SEDUCTIVE.includes(slug)) return { name: "Dark & Seductive", slugs: DARK_AND_SEDUCTIVE };
  if (TROPICAL_PARADISE.includes(slug)) return { name: "Tropical Paradise", slugs: TROPICAL_PARADISE };
  return null;
}

const relatedNotes: Record<string, Record<string, string>> = {
  "dirty-shirley": {
    "orange-julius": "Both bright and bubbly — the Shirley is berry-forward while the Julius leans creamy citrus.",
    "strawberry-daiquiri": "Sister spirits in berry sweetness — the Shirley sparkles with grenadine, the Daiquiri with fresh strawberry.",
    "clover-club": "Both have a berry kiss — the Shirley is bold and fruity, the Clover Club is botanical and refined.",
  },
  "orange-julius": {
    "dirty-shirley": "Both bright and bubbly — the Julius is creamy citrus while the Shirley is berry-forward.",
    "strawberry-daiquiri": "Light and fruity siblings — the Julius wraps citrus in vanilla, the Daiquiri in fresh berry.",
    "clover-club": "Contrasting elegance — the Julius is warm and nostalgic, the Clover Club is crisp and botanical.",
  },
  "strawberry-daiquiri": {
    "dirty-shirley": "Berry sisters — the Daiquiri is sun-kissed rum sweetness, the Shirley is sparkling grenadine.",
    "orange-julius": "Light and fruity siblings — the Daiquiri is fresh berry, the Julius is creamy orange vanilla.",
    "clover-club": "Both feature berry — the Daiquiri is bright and simple, the Clover Club is gin-forward and complex.",
  },
  "clover-club": {
    "dirty-shirley": "Both have berry notes — the Clover Club is botanical gin, the Shirley is bold vodka and grenadine.",
    "orange-julius": "Contrasting elegance — the Clover Club is crisp and botanical, the Julius is warm and creamy.",
    "strawberry-daiquiri": "Both feature berry — the Clover Club is gin-forward and refined, the Daiquiri is bright and simple.",
  },
  "mezcal-soda": {
    "whiskey-sour": "Both have depth and warmth — the Mezcal Soda smolders with smoke, the Whiskey Sour balances bright citrus.",
    "pheromone-martini": "Both are dark and captivating — the Mezcal Soda is earthy smoke, the Pheromone is exotic chocolate and passionfruit.",
    "negroni-sbagliato": "Both have bitter complexity — the Mezcal Soda is smoky agave, the Negroni is Italian Campari and herbs.",
  },
  "whiskey-sour": {
    "mezcal-soda": "Both have depth and warmth — the Whiskey Sour is bright citrus balance, the Mezcal Soda smolders with smoke.",
    "pheromone-martini": "Both are spirit-forward — the Whiskey Sour is a bold classic, the Pheromone is darkly exotic.",
    "negroni-sbagliato": "Classic meets classic — the Whiskey Sour is bourbon brightness, the Negroni is bittersweet Italian soul.",
  },
  "pheromone-martini": {
    "mezcal-soda": "Both are dark and captivating — the Pheromone is exotic passionfruit and chocolate, the Mezcal is earthy smoke.",
    "whiskey-sour": "Both are spirit-forward — the Pheromone is darkly exotic, the Whiskey Sour is a bold classic.",
    "negroni-sbagliato": "Both have a provocative edge — the Pheromone is tropical darkness, the Negroni is Italian bitterness.",
  },
  "negroni-sbagliato": {
    "mezcal-soda": "Both have bitter complexity — the Negroni is Italian Campari and herbs, the Mezcal is smoky agave.",
    "whiskey-sour": "Classic meets classic — the Negroni is bittersweet Italian soul, the Whiskey Sour is bourbon brightness.",
    "pheromone-martini": "Both have a provocative edge — the Negroni is Italian bitterness, the Pheromone is tropical darkness.",
  },
  "jungle-bird": {
    "painkiller": "Both are rum and pineapple — the Jungle Bird adds bitter Campari edge, the Painkiller goes lush with coconut.",
    "paloma": "Both have citrus bite — the Jungle Bird pairs pineapple with Campari, the Paloma is grapefruit and tequila fire.",
    "mai-tai": "Both are tiki legends — the Jungle Bird is wild and bitter, the Mai Tai is rich, almond-kissed, and iconic.",
  },
  "painkiller": {
    "jungle-bird": "Both are rum and pineapple — the Painkiller is lush coconut warmth, the Jungle Bird adds bitter Campari edge.",
    "paloma": "Contrasting tropics — the Painkiller is creamy island warmth, the Paloma is crisp citrus fire.",
    "mai-tai": "Both are rich rum cocktails — the Painkiller is coconut paradise, the Mai Tai is almond and citrus legend.",
  },
  "paloma": {
    "jungle-bird": "Both have citrus bite — the Paloma is grapefruit and tequila fire, the Jungle Bird pairs pineapple with Campari.",
    "painkiller": "Contrasting tropics — the Paloma is crisp citrus fire, the Painkiller is creamy island warmth.",
    "mai-tai": "Both pack a punch — the Paloma is bright tequila and grapefruit, the Mai Tai is rich rum and almond.",
  },
  "mai-tai": {
    "jungle-bird": "Both are tiki legends — the Mai Tai is rich and almond-kissed, the Jungle Bird is wild and bitter.",
    "painkiller": "Both are rich rum cocktails — the Mai Tai is almond and citrus legend, the Painkiller is coconut paradise.",
    "paloma": "Both pack a punch — the Mai Tai is rich rum and almond, the Paloma is bright tequila and grapefruit.",
  },
};

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products.find(p => p.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Skeleton className="aspect-[3/4] rounded-md" />
            <div className="space-y-6 pt-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-72" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl mb-4" data-testid="text-not-found">Product Not Found</h2>
          <Link href="/">
            <Button variant="outline" className="font-body text-base tracking-widest uppercase" data-testid="button-back-home">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const ingredientsList = product.ingredients.split(",").map(i => i.trim());

  const MILK_CLARIFIED = [
    "dirty-shirley", "orange-julius", "mezcal-soda", "whiskey-sour",
    "strawberry-daiquiri", "clover-club", "negroni-sbagliato", "pheromone-martini",
    "lovingly-light", "dark-and-seductive",
  ];
  const TREE_NUT_PRODUCTS = ["mai-tai", "tropical-paradise"];

  const hasLactoseWarning = MILK_CLARIFIED.includes(product.slug);
  const hasTreeNutWarning = TREE_NUT_PRODUCTS.includes(product.slug);

  const collection = getCollection(product.slug);
  const relatedProducts = collection
    ? products.filter(p => collection.slugs.includes(p.slug) && p.slug !== product.slug && !PACKS.includes(p.slug))
    : [];

  const isPack = PACKS.includes(product.slug);
  const servings = product.servings || 4;
  const pricePerServing = (Number(product.price) / servings).toFixed(2);
  const barPricePerDrink = 18;

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/collection">
            <span className="inline-flex items-center gap-2 font-body text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Collection
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[3/4] rounded-md overflow-hidden bg-gradient-to-b from-card to-background/50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-detail"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3" data-testid="text-detail-spirit">
              {product.spirit}
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-wide mb-4" data-testid="text-detail-name">
              {product.name}
            </h1>
            <p className="font-body text-xl text-foreground/70 mb-6 italic" data-testid="text-detail-tagline">
              {product.tagline}
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8" data-testid="text-detail-description">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-xl" data-testid="text-detail-volume">{product.volume}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Volume</p>
              </div>
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-xl" data-testid="text-detail-servings">{product.servings}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Servings</p>
              </div>
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-xl" data-testid="text-detail-abv">{product.abv}</p>
                <p className="font-body text-sm text-muted-foreground mt-1">ABV</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {ingredientsList.map((ingredient, i) => (
                  <span
                    key={i}
                    className="font-body text-sm px-3 py-1.5 rounded-md bg-card border border-border/30 text-foreground/70"
                    data-testid={`text-ingredient-${i}`}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {(hasLactoseWarning || hasTreeNutWarning) && (
              <div className="mb-8 flex items-start gap-3 p-4 rounded-md bg-card/50 border border-border/20">
                <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm tracking-[0.15em] uppercase text-foreground/80 mb-1" data-testid="text-allergen-title">
                    Allergen Notice
                  </p>
                  {hasLactoseWarning && (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid="text-allergen-lactose">
                      Contains lactose. Contains ingredients derived from milk.
                    </p>
                  )}
                  {hasTreeNutWarning && (
                    <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid="text-allergen-treenut">
                      Contains orgeat (almond syrup). Contains ingredients derived from tree nuts.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-border/20 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="font-display text-4xl" data-testid="text-detail-price">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="font-body text-base text-muted-foreground ml-2">
                    per bottle
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {!isPack && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <Card className="p-8 md:p-10 border-primary/30 bg-card/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                <div>
                  <p className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2">At the Bar</p>
                  <p className="font-display text-3xl text-foreground/50 line-through">${barPricePerDrink}.00</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">per cocktail</p>
                </div>
                <div>
                  <p className="font-body text-sm tracking-[0.15em] uppercase text-primary mb-2">With Hedonic</p>
                  <p className="font-display text-4xl text-primary">${pricePerServing}</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">per serving</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground">You Save</p>
                  <p className="font-display text-3xl text-primary">
                    {Math.round(((barPricePerDrink - Number(pricePerServing)) / barPricePerDrink) * 100)}%
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    <span className="font-body text-sm text-muted-foreground">Same premium quality</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {relatedProducts.length > 0 && collection && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
                Also in {collection.name}
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide">
                Explore the Collection
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((related) => {
                const note = relatedNotes[product.slug]?.[related.slug] || "";
                return (
                  <Link key={related.id} href={`/product/${related.slug}`} data-testid={`link-related-${related.slug}`}>
                    <Card className="group overflow-visible border-border/30 bg-card/50 hover-elevate cursor-pointer h-full">
                      <div className="p-6">
                        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-md bg-gradient-to-b from-card to-background/50 flex items-center justify-center">
                          <img
                            src={related.imageUrl}
                            alt={related.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            data-testid={`img-related-${related.slug}`}
                          />
                        </div>
                        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-1">
                          {related.spirit}
                        </p>
                        <h3 className="font-display text-2xl tracking-wide mb-1" data-testid={`text-related-name-${related.slug}`}>
                          {related.name}
                        </h3>
                        <p className="font-display text-xl text-foreground/80 mb-2" data-testid={`text-related-price-${related.slug}`}>
                          ${Number(related.price).toFixed(2)}
                        </p>
                        {note && (
                          <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid={`text-related-note-${related.slug}`}>
                            {note}
                          </p>
                        )}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
