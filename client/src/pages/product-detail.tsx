import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart";
import type { Product } from "@shared/schema";
import { useState } from "react";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products.find(p => p.slug === slug);

  const handleAdd = () => {
    if (product) {
      addItem(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

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

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
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

            <div className="border-t border-border/20 pt-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <span className="font-display text-3xl" data-testid="text-detail-price">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="font-body text-sm text-muted-foreground ml-2">
                    per bottle
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border border-border/30 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-body text-sm" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(q => q + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  className="flex-1 font-body text-sm tracking-widest uppercase"
                  onClick={handleAdd}
                  data-testid="button-add-to-cart"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
