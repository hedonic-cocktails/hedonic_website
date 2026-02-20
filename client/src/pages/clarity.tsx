import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Beaker, Timer, Filter, Sparkles, Milk, Palmtree } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Beaker,
    step: "01",
    title: "The Blend",
    description: "We begin by crafting each cocktail recipe from scratch using premium spirits, fresh-squeezed juices, and house-made syrups. Every ingredient is measured with precision to ensure perfect balance before the clarification process begins.",
  },
  {
    icon: Timer,
    step: "02",
    title: "The Separation",
    description: "The full cocktail is slowly introduced to cold milk — whole dairy milk for our original collections, or coconut milk for our Tropical Paradise line. The natural acidity from the citrus interacts with the milk proteins, gently coaxing them apart into delicate, cloud-like formations that form a natural filtration web. We let this rest for up to 24 hours, allowing the protein structures to fully develop.",
  },
  {
    icon: Filter,
    step: "03",
    title: "The Clarification",
    description: "The mixture is patiently strained through the milk protein web, which acts as a living filter of extraordinary fineness. This natural sieve traps color pigments, tannins, and harsh compounds while letting the pure, clarified liquid pass through. We strain multiple times until the cocktail achieves absolute crystal clarity.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "The Finish",
    description: "The clarified cocktail is carbonated to give it a crisp, effervescent sparkle, then bottled in our signature wine bottles. The result is a shelf-stable, silky-smooth cocktail with a velvety mouthfeel and flavors that are rounder and more refined than the original.",
  },
];

export default function Clarity() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-clarity">
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
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-clarity-label">
            Our Process
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6" data-testid="text-clarity-title">
            The Art of <span className="italic">Clarity</span>
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-clarity-intro">
            Two paths to the same impossible transparency. Whether through traditional dairy milk or tropical coconut milk, our clarification process strips away everything harsh and leaves behind something remarkably refined.
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
            <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-6" data-testid="text-what-title">
              What is Milk Clarification?
            </h2>
            <div className="space-y-5 font-body text-sm text-foreground/70 leading-relaxed">
              <p data-testid="text-what-p1">
                Milk clarification is a centuries-old bartending technique dating back to the 1700s. A finished cocktail is combined with cold milk — the natural acids from citrus juices, tannins, and the alcohol itself interact with the milk proteins, causing them to gently separate into soft, cloud-like formations.
              </p>
              <p data-testid="text-what-p2">
                These protein formations create an extraordinarily fine natural filter. As the cocktail slowly passes through this web, it captures color pigments, tannins, harsh polyphenols, and microscopic particles — everything that makes a cocktail cloudy, astringent, or rough around the edges.
              </p>
              <p data-testid="text-what-p3">
                What remains is something exceptional: a cocktail that is perfectly transparent, impossibly smooth, with a velvety mouthfeel that lingers on the palate. The flavors become rounder, more refined, more complete. It is the same cocktail, elevated to its most elegant form.
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-border/30 bg-card/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                  <Milk className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide" data-testid="text-dairy-title">Dairy Milk Clarification</h3>
              </div>
              <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                <p data-testid="text-dairy-desc">
                  Our original technique, used across the Lovingly Light and Dark &amp; Seductive collections. Cold whole milk provides the protein matrix that filters each cocktail to crystal clarity. Residual lactose imparts a subtle sweetness and a luxuriously silky mouthfeel.
                </p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-foreground/50">
                  Used in: Dirty Shirley, Orange Julius, Strawberry Daiquiri, Clover Club, Whiskey Sour, Mezcal Soda, Pheromone Martini, Negroni Sbagliato
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <Card className="p-8 border-border/30 bg-card/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                  <Palmtree className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide" data-testid="text-coconut-title">Coconut Milk Clarification</h3>
              </div>
              <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                <p data-testid="text-coconut-desc">
                  Our tropical variation, developed specifically for the Tropical Paradise collection. Full-fat coconut milk provides the same protein-based filtration while adding a whisper of tropical richness that complements the island-inspired flavors. The result is the same impossible transparency with a subtly different character.
                </p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-foreground/50">
                  Used in: Jungle Bird, Painkiller, Paloma, Mai Tai
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Step by Step
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide" data-testid="text-steps-title">
              How We Make It
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Card className="p-8 border-border/30 bg-card/50 h-full">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1" data-testid={`text-step-num-${i}`}>
                        Step {step.step}
                      </p>
                      <h3 className="font-display text-xl tracking-wide mb-3" data-testid={`text-step-title-${i}`}>
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed" data-testid={`text-step-desc-${i}`}>
                        {step.description}
                      </p>
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
        >
          <Card className="p-8 md:p-12 border-border/30 bg-card/50 mb-16">
            <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-6" data-testid="text-why-title">
              Why Clarify?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-lg mb-2 text-primary" data-testid="text-benefit-1">Texture</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Whether from dairy lactose or coconut fat, clarification gives each cocktail a velvety, luxurious mouthfeel you simply cannot achieve any other way. Once you experience it, you&apos;ll understand our obsession.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2 text-primary" data-testid="text-benefit-2">Flavor</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Tannins and harsh compounds are stripped away, and what&apos;s left is pure refinement. Rounder flavors. Softer edges. You taste nuance, not noise. Elegance, not excess.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2 text-primary" data-testid="text-benefit-3">Longevity</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Clarified cocktails are remarkably shelf-stable. The compounds that cause degradation are gone, so every bottle stays at its peak for months — ready whenever you are.
                </p>
              </div>
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
          <h2 className="font-display text-3xl md:text-4xl tracking-wide italic mb-4" data-testid="text-clarity-cta">
            Ready to Feel the Difference?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Three hundred years of technique. Two paths to perfection. One unforgettable first sip.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/quiz">
              <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-clarity-quiz">
                Find Your Bottle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/collection">
              <Button variant="outline" className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-clarity-shop">
                Browse All
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
