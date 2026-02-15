import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
const LOVINGLY_LIGHT = ["dirty-shirley", "orange-julius", "strawberry-daiquiri", "clover-club"];
const DARK_AND_SEDUCTIVE = ["mezcal-soda", "whiskey-sour", "pheromone-martini", "negroni-sbagliato"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
              <Link href={`/product/${product.slug}`}>
                <Button variant="outline" size="sm" className="font-body text-xs tracking-widest uppercase" data-testid={`button-view-${product.slug}`}>
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CollectionGroup({
  title,
  subtitle,
  products,
  slugs,
  startIndex,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  slugs: string[];
  startIndex: number;
}) {
  const filtered = products.filter(p => slugs.includes(p.slug));
  if (filtered.length === 0) return null;

  return (
    <div className="mb-24 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
          {title}
        </p>
        <h3 className="font-display text-3xl md:text-4xl tracking-wide italic">
          {subtitle}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={startIndex + i} />
        ))}
      </div>
    </div>
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
            Eight Expressions
          </h1>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Eight expressions, each with its own character. Find the one that speaks to you.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map(i => (
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
          <>
            <CollectionGroup
              title="Bright & Refreshing"
              subtitle="Lovingly Light"
              products={products}
              slugs={LOVINGLY_LIGHT}
              startIndex={0}
            />
            <CollectionGroup
              title="Bold & Complex"
              subtitle="Dark & Seductive"
              products={products}
              slugs={DARK_AND_SEDUCTIVE}
              startIndex={4}
            />

            {(() => {
              const lightPack = products.find(p => p.slug === "lovingly-light");
              const darkPack = products.find(p => p.slug === "dark-and-seductive");
              if (!lightPack && !darkPack) return null;
              return (
                <div className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                  >
                    <p className="font-display text-2xl md:text-3xl tracking-wide mb-2">
                      Not sure what you want?
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Let us help you decide.
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {lightPack && <ProductCard product={lightPack} index={8} />}
                    {darkPack && <ProductCard product={darkPack} index={9} />}
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
}
