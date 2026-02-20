import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Gem, Leaf, Droplets, Wine, Heart, Star, Check, X, Clock, Users, UtensilsCrossed, Car, Timer, Music, GlassWater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description: "We source only the finest spirits from artisan distilleries. Five-times-distilled vodka for absolute purity. Hand-selected agave, slow-roasted in earthen pits by master mezcaleros. Premium aged rum from Caribbean traditions. London dry gin with hand-foraged botanicals. Small-batch bourbon and tequila with real provenance. There are no shortcuts, no substitutes, no compromises.",
  },
  {
    icon: Leaf,
    title: "Real Ingredients",
    description: "Fresh-squeezed citrus, never from concentrate. House-made vanilla syrup from whole Madagascar beans. Grenadine from real pomegranate. Hand-pressed pineapple juice. Ruby grapefruit, ripe strawberries, and fresh raspberries. Real coconut milk, not powder. Authentic orgeat from whole almonds. Every ingredient earns its place in the bottle.",
  },
  {
    icon: Droplets,
    title: "Two Paths to Clarity",
    description: "Our original eight cocktails undergo traditional milk clarification — a centuries-old technique that transforms bold flavors into crystal-clear, luminous liquid. Our Tropical Paradise collection takes a different path: coconut milk clarification, which imparts a subtle richness while achieving the same stunning transparency. Two methods, one obsession with perfection.",
  },
  {
    icon: Wine,
    title: "Velvet Mouthfeel",
    description: "Clarification doesn't just change how our cocktails look — it fundamentally transforms how they feel. Whether through milk or coconut, the process strips away harshness and leaves behind a silky, velvety texture that coats the palate and carries flavor in a way unclarified cocktails simply cannot. Every sip is smooth, round, and impossibly luxurious.",
  },
];

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

const headToHead = [
  { icon: Clock, category: "Timing", bar: "Wait for a table or seat", hedonic: "Ready whenever the occasion calls" },
  { icon: Music, category: "Atmosphere", bar: "Crowded, noisy atmosphere", hedonic: "Your space, your music, your pace" },
  { icon: GlassWater, category: "Quality", bar: "Limited to bar's menu", hedonic: "Same premium spirits, silky finish" },
  { icon: Car, category: "Logistics", bar: "Arrange rides both ways", hedonic: "No driving, no waiting, no hassle" },
  { icon: Gem, category: "Value", bar: "2+ hours and $130 committed", hedonic: "All the elegance, none of the markup" },
];

export default function WhyHedonic() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-why">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-8 mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-why-label">
            Why Hedonic
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6" data-testid="text-why-title">
            The Pursuit of <span className="italic">Pleasure</span>
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-why-intro">
            Hedonic was born from a simple conviction: that pleasure is not a luxury — it is a philosophy. Twelve cocktails, three collections, and one obsession with perfection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <Card className="p-8 md:p-12 border-border/30 bg-card/50">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl tracking-wide" data-testid="text-philosophy-title">
                Our Philosophy
              </h2>
            </div>
            <div className="space-y-5 font-body text-sm text-foreground/70 leading-relaxed">
              <p data-testid="text-philosophy-p1">
                The word <span className="italic text-foreground">hedonic</span> comes from the Greek <span className="italic text-foreground">hedonikos</span> — relating to pleasure. It is the root of hedonism, the philosophy that the highest good is the pursuit of sensory delight. We named our company after this idea because we believe it in our bones.
              </p>
              <p data-testid="text-philosophy-p2">
                A perfect cocktail is one of life&apos;s great pleasures. The weight of the glass in your hand. The first sip that makes you pause and appreciate. The warmth that settles in and elevates the evening. That experience should be yours whenever you want it — not reserved for $25 a pour behind a velvet rope.
              </p>
              <p data-testid="text-philosophy-p3">
                That&apos;s why we created Hedonic. We wanted to bottle the experience — not approximate it, not dilute it, but preserve it in its finest form. The same obsessive craft a world-class bartender brings to their greatest creation, waiting in your home for whenever the occasion calls.
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide" data-testid="text-pillars-title">
              Four Pillars of Hedonic
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Card className="p-8 border-border/30 bg-card/50 h-full">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                        <pillar.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl tracking-wide mb-3" data-testid={`text-pillar-title-${i}`}>
                        {pillar.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid={`text-pillar-desc-${i}`}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-compare-label">
              More Good Nights for Less
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4" data-testid="text-compare-title">
              Hedonic <span className="italic">at Home</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto">
              Same top-shelf spirits. Same refined cocktails. Same velvet mouthfeel — without the inflated bill, the crowded bar, or the ride home. One night out buys you {Math.floor(barTotal / hedonicTotal)} elevated evenings at home with Hedonic.
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
                  <h3 className="font-display text-xl md:text-2xl tracking-wide" data-testid="text-bar-title">A Night at the Bar</h3>
                </div>
                <div className="space-y-3 mb-6">
                  {barCosts.map((cost, i) => (
                    <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-bar-cost-${i}`}>
                      <div>
                        <p className="font-body text-sm text-foreground">{cost.label}</p>
                        <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                      </div>
                      <span className="font-body text-sm text-foreground">${Math.round(cost.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/20 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-lg">Total</span>
                    <span className="font-display text-2xl md:text-3xl" data-testid="text-bar-total">${Math.round(barTotal)}</span>
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
                  <span className="font-body text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1.5 rounded-md" data-testid="text-best-value">
                    Best Value
                  </span>
                </div>
                <div className="mb-6">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Option B</p>
                  <h3 className="font-display text-xl md:text-2xl tracking-wide" data-testid="text-hedonic-title">A Night with Hedonic</h3>
                </div>
                <div className="space-y-3 mb-6">
                  {hedonicCosts.map((cost, i) => (
                    <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-hedonic-cost-${i}`}>
                      <div>
                        <p className="font-body text-sm text-foreground">{cost.label}</p>
                        <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                      </div>
                      <span className="font-body text-sm text-foreground">${Math.round(cost.amount)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                    <p className="font-body text-sm line-through">Uber there</p>
                    <span className="font-body text-sm line-through">$0</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                    <p className="font-body text-sm line-through">Uber home</p>
                    <span className="font-body text-sm line-through">$0</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                    <p className="font-body text-sm line-through">Tip</p>
                    <span className="font-body text-sm line-through">$0</span>
                  </div>
                </div>
                <div className="border-t border-primary/20 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-lg">Total</span>
                    <span className="font-display text-2xl md:text-3xl text-primary" data-testid="text-hedonic-total">${Math.round(hedonicTotal)}</span>
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
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-savings-label">
                Your Savings
              </p>
              <h3 className="font-display text-5xl md:text-7xl tracking-wide text-primary mb-2" data-testid="text-savings-pct">
                {savingsPercent}%
              </h3>
              <p className="font-body text-lg text-muted-foreground mb-2">
                That&apos;s <span className="text-primary font-semibold">${Math.round(savings)}</span> back in your pocket
              </p>
              <p className="font-body text-base text-muted-foreground max-w-lg mx-auto">
                One bar night = <span className="text-primary font-semibold">{Math.floor(barTotal / hedonicTotal)} Hedonic nights</span> of the same luxury.
              </p>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {headToHead.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="p-5 border-border/30 bg-card/50 text-center h-full" data-testid={`card-h2h-${i}`}>
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-display text-sm tracking-wide mb-3">{item.category}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-left">
                      <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="font-body text-xs text-muted-foreground leading-relaxed">{item.bar}</span>
                    </div>
                    <div className="flex items-start gap-2 text-left">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-xs text-foreground leading-relaxed">{item.hedonic}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <Card className="p-8 md:p-12 border-border/30 bg-card/50">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl tracking-wide" data-testid="text-promise-title">
                The Hedonic Promise
              </h2>
            </div>
            <div className="space-y-5 font-body text-sm text-foreground/70 leading-relaxed">
              <p data-testid="text-promise-p1">
                Every bottle of Hedonic is a quiet declaration: that you refuse to settle. Not for canned cocktails drowning in artificial sweetness. Not for bottom-shelf spirits hiding behind clever marketing. Not for anything less than the real thing.
              </p>
              <p data-testid="text-promise-p2">
                We use premium spirits because your palate knows the difference — even when your mind doesn&apos;t. The purity of five-times-distilled vodka means flavors that glide rather than burn. The depth of hand-selected agave means smokiness that lingers with quiet authority. The richness of aged Caribbean rum means island warmth that envelops rather than overwhelms. Every spirit is chosen with intention.
              </p>
              <p data-testid="text-promise-p3">
                And then we go further. Our signature clarification — whether through traditional milk or tropical coconut — transforms each cocktail into something extraordinary. Crystal-clear liquid with a texture so refined it redefines what you thought a bottled cocktail could be.
              </p>
              <p data-testid="text-promise-p4">
                Twelve expressions. Three collections. One uncompromising standard. This is not a cocktail you simply drink. It is a cocktail you <span className="italic text-foreground">savour</span>.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-wide italic mb-4" data-testid="text-why-cta">
            Ready to Indulge?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Discover the collection or let us match you with your perfect bottle.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/quiz">
              <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-why-quiz">
                Find Your Bottle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/collection">
              <Button variant="outline" className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-why-collection">
                Browse All
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
