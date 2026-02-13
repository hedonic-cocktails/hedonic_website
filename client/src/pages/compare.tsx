import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const barCosts = [
  { label: "4 craft cocktails", detail: "$18 each", amount: 72.00 },
  { label: "Bar snack", detail: "Appetizer", amount: 6.00 },
  { label: "Tax", detail: "~8.5%", amount: 6.63 },
  { label: "Tip", detail: "20%", amount: 15.60 },
  { label: "Uber there", detail: "Rideshare", amount: 18.00 },
  { label: "Uber home", detail: "Rideshare", amount: 22.00 },
];

const hedonicCosts = [
  { label: "1 Hedonic bottle", detail: "4 servings", amount: 29.99 },
  { label: "Tax", detail: "~8.5%", amount: 2.55 },
];

const barTotal = barCosts.reduce((sum, c) => sum + c.amount, 0);
const hedonicTotal = hedonicCosts.reduce((sum, c) => sum + c.amount, 0);
const savings = barTotal - hedonicTotal;
const savingsPercent = Math.round((savings / barTotal) * 100);

const barExperience = [
  { text: "Wait for a table or seat", positive: false },
  { text: "Crowded, noisy atmosphere", positive: false },
  { text: "Limited to bar's menu", positive: false },
  { text: "Arrange rides both ways", positive: false },
  { text: "2+ hours committed", positive: false },
];

const hedonicExperience = [
  { text: "Ready when you are", positive: true },
  { text: "Your space, your music, your vibe", positive: true },
  { text: "Bar-quality craft cocktails", positive: true },
  { text: "No driving, no waiting", positive: true },
  { text: "Enjoy at your own pace", positive: true },
];

export default function Compare() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-compare">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mt-8 mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-compare-label">
            The Smart Choice
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6" data-testid="text-compare-title">
            A Night Out vs. <span className="italic">A Night In</span>
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-compare-intro">
            Same quality. Same number of drinks. Dramatically different price tag. Here's what a night of four cocktails actually costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-border/30 bg-card/50 h-full">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Option A</p>
                  <h2 className="font-display text-2xl tracking-wide" data-testid="text-bar-title">A Night at the Bar</h2>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {barCosts.map((cost, i) => (
                  <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-bar-cost-${i}`}>
                    <div>
                      <p className="font-body text-sm text-foreground">{cost.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                    </div>
                    <span className="font-body text-sm text-foreground">${cost.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/20 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-3xl" data-testid="text-bar-total">${barTotal.toFixed(2)}</span>
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
            <Card className="p-8 border-primary/30 bg-card/50 h-full relative">
              <div className="absolute -top-3 right-6">
                <span className="font-body text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1.5 rounded-md" data-testid="text-best-value">
                  Best Value
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Option B</p>
                  <h2 className="font-display text-2xl tracking-wide" data-testid="text-hedonic-title">A Night with Hedonic</h2>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {hedonicCosts.map((cost, i) => (
                  <div key={i} className="flex items-center justify-between gap-4" data-testid={`row-hedonic-cost-${i}`}>
                    <div>
                      <p className="font-body text-sm text-foreground">{cost.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{cost.detail}</p>
                    </div>
                    <span className="font-body text-sm text-foreground">${cost.amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <div>
                    <p className="font-body text-sm line-through">Uber there</p>
                  </div>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <div>
                    <p className="font-body text-sm line-through">Uber home</p>
                  </div>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-muted-foreground/40">
                  <div>
                    <p className="font-body text-sm line-through">Tip</p>
                  </div>
                  <span className="font-body text-sm line-through">$0.00</span>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-3xl text-primary" data-testid="text-hedonic-total">${hedonicTotal.toFixed(2)}</span>
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
            <h2 className="font-display text-5xl md:text-7xl tracking-wide text-primary mb-2" data-testid="text-savings-amount">
              ${savings.toFixed(2)}
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-2" data-testid="text-savings-percent">
              That's <span className="text-primary font-semibold">{savingsPercent}%</span> less per night
            </p>
            <p className="font-body text-sm text-muted-foreground/70 max-w-md mx-auto">
              Same number of drinks. Same premium quality. No compromises, no Ubers, no waiting.
            </p>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-border/30 bg-card/50 h-full">
              <h3 className="font-display text-xl tracking-wide mb-6" data-testid="text-bar-exp-title">The Bar Experience</h3>
              <div className="space-y-4">
                {barExperience.map((item, i) => (
                  <div key={i} className="flex items-center gap-3" data-testid={`row-bar-exp-${i}`}>
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 border-primary/30 bg-card/50 h-full">
              <h3 className="font-display text-xl tracking-wide mb-6" data-testid="text-hedonic-exp-title">The Hedonic Experience</h3>
              <div className="space-y-4">
                {hedonicExperience.map((item, i) => (
                  <div key={i} className="flex items-center gap-3" data-testid={`row-hedonic-exp-${i}`}>
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-body text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-wide italic mb-4" data-testid="text-compare-cta">
            The Choice is Clear
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Premium cocktails, zero hassle. Keep ${savings.toFixed(0)} in your pocket.
          </p>
          <Link href="/collection">
            <Button className="font-body text-sm tracking-widest uppercase px-8" data-testid="button-compare-shop">
              Shop the Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
