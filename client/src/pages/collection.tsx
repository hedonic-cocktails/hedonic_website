import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Card className="group overflow-visible border-border/30 bg-card/50 backdrop-blur-sm hover-elevate">
        <div className="p-6">
          <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-md bg-gradient-to-b from-card to-background/50 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-testid={`img-product-${product.slug}`}
            />
          </div>

          <div className="space-y-3">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary" data-testid={`text-spirit-${product.slug}`}>
              {product.spirit}
            </p>
            <h3 className="font-display text-2xl tracking-wide" data-testid={`text-name-${product.slug}`}>
              {product.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2" data-testid={`text-tagline-${product.slug}`}>
              {product.tagline}
            </p>

            <div className="flex items-end justify-between gap-4 pt-2">
              <div>
                <span className="font-display text-2xl text-foreground" data-testid={`text-price-${product.slug}`}>
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="font-body text-xs text-muted-foreground ml-2">
                  / {product.volume}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/product/${product.slug}`}>
                  <Button variant="outline" size="sm" className="font-body text-xs tracking-widest uppercase" data-testid={`button-view-${product.slug}`}>
                    Details
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="font-body text-xs tracking-widest uppercase"
                  onClick={() => addItem(product)}
                  data-testid={`button-add-${product.slug}`}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Collection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-collection">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 mt-8"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-collection-label">
            The Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-collection-title">
            Three Expressions
          </h1>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Each cocktail tells its own story. Distinct flavors, united by an obsession with quality.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map(i => (
              <Card key={i} className="p-6 border-border/30">
                <Skeleton className="aspect-[3/4] rounded-md mb-6" />
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-8 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
