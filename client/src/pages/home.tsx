import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Droplets, Wine, HelpCircle, X, Check } from "lucide-react";
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
            Refined Indulgence
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-tight mb-6" data-testid="text-hero-title">
            Crafted for
            <br />
            <span className="italic text-primary">Pleasure</span>
          </h1>
          <p className="font-body text-base md:text-lg text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed" data-testid="text-hero-subtitle">
            Crystal-clear. Impossibly smooth. Every bottle is an exercise in balance — premium spirits, real ingredients, and nothing between you and pure indulgence.
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

const LOVINGLY_LIGHT = ["dirty-shirley", "orange-julius", "strawberry-daiquiri", "clover-club"];
const DARK_AND_SEDUCTIVE = ["mezcal-soda", "whiskey-sour", "pheromone-martini", "negroni-sbagliato"];

function CollectionGroup({
  title,
  subtitle,
  products,
  packSlug,
  startIndex,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  packSlug: string;
  startIndex: number;
}) {
  return (
    <div className="mb-24 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3" data-testid={`text-group-label-${packSlug}`}>
          {title}
        </p>
        <h3 className="font-display text-3xl md:text-4xl tracking-wide italic" data-testid={`text-group-title-${packSlug}`}>
          {subtitle}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products
          .filter(p => (packSlug === "lovingly-light" ? LOVINGLY_LIGHT : DARK_AND_SEDUCTIVE).includes(p.slug))
          .map((product, i) => (
            <ProductCard key={product.id} product={product} index={startIndex + i} />
          ))}
      </div>

    </div>
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
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-collection-label">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-collection-title">
            Every Expression
          </h2>
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
                <div className="flex justify-between gap-2">
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
              packSlug="lovingly-light"
              startIndex={0}
            />
            <CollectionGroup
              title="Bold & Complex"
              subtitle="Dark & Seductive"
              products={products}
              packSlug="dark-and-seductive"
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
    </section>
  );
}

const barCosts = [
  { label: "4 craft cocktails", detail: "$18 each", amount: 72.00 },
  { label: "Bar snack", detail: "Appetizer", amount: 6.00 },
  { label: "Tax", detail: "~8.5%", amount: 6.63 },
  { label: "Tip", detail: "20%", amount: 15.60 },
  { label: "Uber there", detail: "Rideshare", amount: 13.00 },
  { label: "Uber home", detail: "Rideshare", amount: 17.00 },
];

const hedonicCosts = [
  { label: "1 Hedonic bottle", detail: "4 servings", amount: 29.99 },
  { label: "Tax", detail: "~8.5%", amount: 2.55 },
];

const barTotal = barCosts.reduce((sum, c) => sum + c.amount, 0);
const hedonicTotal = hedonicCosts.reduce((sum, c) => sum + c.amount, 0);
const savings = barTotal - hedonicTotal;
const savingsPercent = Math.round((savings / barTotal) * 100);

const hedonicPerks = [
  "Ready whenever the occasion calls",
  "Your space, your music, your pace",
  "Same premium spirits, same silky finish",
  "No driving, no waiting, no hassle",
  "All the elegance, none of the markup",
];

function HedonicAtHomeSection() {
  return (
    <section className="py-24 px-6 border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-athome-label">
            More Good Nights for Less
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-athome-title">
            Hedonic <span className="italic">at Home</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">
            Same top-shelf spirits. Same refined cocktails. Same velvet mouthfeel — without the inflated bill, the crowded bar, or the ride home.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 md:p-8 border-border/30 bg-card/50 h-full">
              <div className="mb-6">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Option A</p>
                <h3 className="font-display text-xl md:text-2xl tracking-wide" data-testid="text-home-bar-title">A Night at the Bar</h3>
              </div>
              <div className="space-y-3 mb-6">
                {barCosts.map((cost, i) => (
                  <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-home-bar-cost-${i}`}>
                    <div>
                      <p className="font-body text-sm text-foreground">{cost.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                    </div>
                    <span className="font-body text-sm text-foreground">${cost.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/20 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl md:text-3xl" data-testid="text-home-bar-total">${barTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 md:p-8 border-primary/30 bg-card/50 h-full relative">
              <div className="absolute -top-3 right-6">
                <span className="font-body text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1.5 rounded-md" data-testid="text-home-best-value">
                  Best Value
                </span>
              </div>
              <div className="mb-6">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Option B</p>
                <h3 className="font-display text-xl md:text-2xl tracking-wide" data-testid="text-home-hedonic-title">A Night with Hedonic</h3>
              </div>
              <div className="space-y-3 mb-6">
                {hedonicCosts.map((cost, i) => (
                  <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-home-hedonic-cost-${i}`}>
                    <div>
                      <p className="font-body text-sm text-foreground">{cost.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                    </div>
                    <span className="font-body text-sm text-foreground">${cost.amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <p className="font-body text-sm line-through">Uber there</p>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <p className="font-body text-sm line-through">Uber home</p>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <p className="font-body text-sm line-through">Tip</p>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
              </div>
              <div className="border-t border-primary/20 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl md:text-3xl text-primary" data-testid="text-home-hedonic-total">${hedonicTotal.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <Card className="p-8 md:p-12 border-primary/30 bg-card/50 text-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-home-savings-label">
              Your Savings
            </p>
            <h3 className="font-display text-5xl md:text-7xl tracking-wide text-primary mb-2" data-testid="text-home-savings-amount">
              ${savings.toFixed(2)}
            </h3>
            <p className="font-body text-lg text-muted-foreground mb-2">
              That&apos;s <span className="text-primary font-semibold">{savingsPercent}%</span> less per night
            </p>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto mb-4">
              One bar night = <span className="text-primary font-semibold">{Math.floor(barTotal / hedonicTotal)} Hedonic nights</span> of the same luxury.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 md:p-8 border-primary/30 bg-card/50">
            <h3 className="font-display text-xl md:text-2xl tracking-wide mb-6 text-center" data-testid="text-home-perks-title">The Hedonic Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {hedonicPerks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`row-home-perk-${i}`}>
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">{perk}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  const features = [
    {
      icon: Sparkles,
      title: "Top-Shelf Only",
      description: "We start with spirits so good you'd sip them straight. Five-times-distilled vodka. Hand-selected agave. No compromises, no apologies.",
    },
    {
      icon: Droplets,
      title: "Nothing Fake",
      description: "Fresh-squeezed citrus. House-made syrups from real vanilla and pomegranate. If it doesn't belong, it doesn't go in.",
    },
    {
      icon: Wine,
      title: "Velvet in a Bottle",
      description: "Milk-clarified for impossible smoothness, then carbonated with a gentle fizz. Once you experience the texture, nothing else compares.",
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
            Why We Exist
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-story-title">
            Obsessively Crafted
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            A perfect cocktail shouldn&apos;t require a reservation, a bartender, and a $25 tab. It should be waiting for you at home — effortless elegance, whenever you want it.
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
            Indulge.
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Four pours per bottle. $29.99. Delivered to your door. The finest night in is one click away.
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

function QuizPrompt() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const scrollTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (dismissed) return;
    const alreadyShown = sessionStorage.getItem("quiz-prompt-shown");
    if (alreadyShown) return;

    const tick = (timestamp: number) => {
      if (lastTimestampRef.current !== null) {
        const delta = (timestamp - lastTimestampRef.current) / 1000;
        if (window.scrollY > 100) {
          scrollTimeRef.current += delta;
        }
      }
      lastTimestampRef.current = timestamp;

      if (scrollTimeRef.current >= 15) {
        setShow(true);
        sessionStorage.setItem("quiz-prompt-shown", "true");
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleStart = () => {
    setShow(false);
    setDismissed(true);
    navigate("/quiz");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          data-testid="quiz-prompt-overlay"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleDismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-md w-full bg-card border border-border/40 rounded-md p-10 text-center"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-dismiss-quiz-prompt"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>

            <h3 className="font-display text-3xl tracking-wide mb-3" data-testid="text-quiz-prompt-title">
              Not Sure <span className="italic text-primary">Where to Start?</span>
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
              Tell us your preferences and we&apos;ll match you with the perfect bottle.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleStart}
                className="font-body text-sm tracking-widest uppercase w-full"
                data-testid="button-start-quiz-prompt"
              >
                Find Your Bottle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleDismiss}
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
                data-testid="button-continue-browsing"
              >
                I&apos;m Just Browsing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <HedonicAtHomeSection />
      <CollectionSection products={products} isLoading={isLoading} />
      <StorySection />
      <CtaSection />
      <QuizPrompt />
    </div>
  );
}
