import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Gem, Leaf, Droplets, Wine, Heart, Star, Palmtree, Sparkles } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-about">
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
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-about-label">
            About Us
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6" data-testid="text-about-title">
            The Pursuit of <span className="italic">Pleasure</span>
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-about-intro">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <Card className="p-8 md:p-12 border-border/30 bg-card/50">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl tracking-wide" data-testid="text-collections-title">
                Three Collections, One Standard
              </h2>
            </div>
            <div className="space-y-6 font-body text-sm text-foreground/70 leading-relaxed">
              <div>
                <p className="font-display text-lg text-foreground mb-2" data-testid="text-collection-light-title">Lovingly Light</p>
                <p data-testid="text-collection-light-desc">
                  Our brightest, most radiant expressions. The Dirty Shirley&apos;s sparkling grenadine and lime. The Orange Julius&apos;s creamy vanilla and fresh citrus. The Strawberry Daiquiri&apos;s sun-kissed berry sweetness. The Clover Club&apos;s botanical gin and tart raspberry elegance. Each one milk-clarified to a stunning translucent brilliance — cocktails that glow like liquid jewels.
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-foreground mb-2" data-testid="text-collection-dark-title">Dark &amp; Seductive</p>
                <p data-testid="text-collection-dark-desc">
                  For the evenings that call for something deeper. The Whiskey Sour&apos;s bold depth and bright citrus. The Mezcal Soda&apos;s smoky character with a smoldering finish. The Pheromone Martini&apos;s exotic passionfruit and dark chocolate. The Negroni Sbagliato&apos;s bittersweet Campari bite and Italian soul. Each one milk-clarified to a luminous amber — provocation in every sip.
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-foreground mb-2" data-testid="text-collection-tropical-title">Tropical Paradise</p>
                <p data-testid="text-collection-tropical-desc">
                  Our newest collection takes a different path to clarity. The Jungle Bird&apos;s wild pineapple and bitter Campari. The Painkiller&apos;s lush coconut and island warmth. The Paloma&apos;s crisp grapefruit and tequila fire. The Mai Tai&apos;s legendary rum and almond orgeat. Each one clarified through coconut milk — a technique that adds a subtle tropical richness while achieving the same impossible transparency.
                </p>
              </div>
            </div>
          </Card>
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
          <h2 className="font-display text-3xl md:text-4xl tracking-wide italic mb-4" data-testid="text-about-cta">
            Curious About Our Process?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Discover the centuries-old techniques that give every Hedonic cocktail its impossible clarity and remarkably smooth texture.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/clarity">
              <Button variant="outline" className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-about-clarity">
                Our Process
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/collection">
              <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-about-shop">
                Explore the Collection
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
