import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Droplets, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6" data-testid="text-hero-label">
            Premium Ready-to-Drink
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-tight mb-6" data-testid="text-hero-title">
            Crafted for
            <br />
            <span className="italic text-primary">Pleasure</span>
          </h1>
          <p className="font-body text-base md:text-lg text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed" data-testid="text-hero-subtitle">
            Every bottle is a masterclass in balance. Made with premium spirits, real ingredients, and nothing artificial.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/collection">
              <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-explore">
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

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

function CollectionSection({ products, isLoading }: { products: Product[]; isLoading: boolean }) {
  return (
    <section id="collection" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-collection-label">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-collection-title">
            Seven Expressions
          </h2>
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
                <div className="flex justify-between">
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
    </section>
  );
}

function StorySection() {
  const features = [
    {
      icon: Sparkles,
      title: "Premium Spirits",
      description: "Every bottle starts with carefully selected, top-shelf spirits from artisan distilleries.",
    },
    {
      icon: Droplets,
      title: "Real Ingredients",
      description: "Fresh juices, house-made syrups, and natural botanicals. Nothing artificial, ever.",
    },
    {
      icon: Wine,
      title: "Bar Quality",
      description: "The same techniques and precision a world-class bartender would use, in every bottle.",
    },
  ];

  return (
    <section id="story" className="py-24 px-6 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-story-label">
            Our Philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-story-title">
            Obsessively Crafted
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            We believe a great cocktail shouldn&apos;t require a bar cart, a shaker, and twenty minutes. It should be ready when you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center px-4"
            >
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl tracking-wide mb-3" data-testid={`text-feature-title-${i}`}>
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid={`text-feature-desc-${i}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 px-6 border-t border-border/20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 italic" data-testid="text-cta-title">
            Ready to Indulge?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            $29.99 per bottle. Approximately four cocktails per bottle. Delivered to your door.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/collection">
              <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-shop-now">
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-find-bottle">
                Find Your Bottle
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <CollectionSection products={products} isLoading={isLoading} />
      <StorySection />
      <CtaSection />
    </div>
  );
}
