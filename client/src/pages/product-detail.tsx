import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

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
          <h2 className="font-display text-3xl mb-4" data-testid="text-not-found">Product Not Found</h2>
          <Link href="/">
            <Button variant="outline" className="font-body text-sm tracking-widest uppercase" data-testid="button-back-home">
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

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/collection">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back">
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
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3" data-testid="text-detail-spirit">
              {product.spirit}
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-detail-name">
              {product.name}
            </h1>
            <p className="font-body text-lg text-foreground/70 mb-6 italic" data-testid="text-detail-tagline">
              {product.tagline}
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8" data-testid="text-detail-description">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-lg" data-testid="text-detail-volume">{product.volume}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Volume</p>
              </div>
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-lg" data-testid="text-detail-servings">{product.servings}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Servings</p>
              </div>
              <div className="text-center p-4 rounded-md bg-card/50 border border-border/20">
                <p className="font-display text-lg" data-testid="text-detail-abv">{product.abv}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">ABV</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {ingredientsList.map((ingredient, i) => (
                  <span
                    key={i}
                    className="font-body text-xs px-3 py-1.5 rounded-md bg-card border border-border/30 text-foreground/70"
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
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-foreground/80 mb-1" data-testid="text-allergen-title">
                    Allergen Notice
                  </p>
                  {hasLactoseWarning && (
                    <p className="font-body text-xs text-muted-foreground leading-relaxed" data-testid="text-allergen-lactose">
                      Contains lactose. Contains ingredients derived from milk.
                    </p>
                  )}
                  {hasTreeNutWarning && (
                    <p className="font-body text-xs text-muted-foreground leading-relaxed" data-testid="text-allergen-treenut">
                      Contains orgeat (almond syrup). Contains ingredients derived from tree nuts.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-border/20 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="font-display text-3xl" data-testid="text-detail-price">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="font-body text-sm text-muted-foreground ml-2">
                    per bottle
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
