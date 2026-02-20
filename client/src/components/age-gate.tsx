import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hedonic_age_verified");
    if (stored === "true") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("hedonic_age_verified", "true");
    setVerified(true);
  };

  const handleNo = () => {
    setDenied(true);
  };

  if (verified === null) return null;

  return (
    <>
      <AnimatePresence>
        {!verified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative text-center px-6 max-w-md"
            >
              <div className="relative w-32 h-44 mx-auto mb-8">
                <img
                  src="/images/dirty-shirley.png"
                  alt="Hedonic Bottle"
                  className="w-full h-full object-contain opacity-80"
                  data-testid="img-age-gate-bottle"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <img src="/images/logo-octopus.png" alt="Hedonic" className="w-16 h-16 object-contain mx-auto mb-3" />
              <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-2" data-testid="text-age-title">
                HEDONIC
              </h1>
              <p className="font-display text-sm italic text-primary tracking-wide mb-1" data-testid="text-age-tagline">
                Pleasure, Bottled.
              </p>
              <div className="w-12 h-px bg-primary/40 mx-auto my-5" />
              <p className="font-body text-xs text-muted-foreground/70 tracking-wide uppercase mb-8">
                Clarified &middot; Carbonated &middot; Extraordinary
              </p>

              {denied ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-body text-sm text-muted-foreground"
                  data-testid="text-age-denied"
                >
                  You must be of legal drinking age to enter this site.
                </motion.p>
              ) : (
                <>
                  <p className="font-body text-sm text-foreground/80 mb-8" data-testid="text-age-question">
                    Are you of legal drinking age?
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={handleYes}
                      className="min-w-[120px] font-body text-sm tracking-widest uppercase"
                      data-testid="button-age-yes"
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleNo}
                      className="min-w-[120px] font-body text-sm tracking-widest uppercase"
                      data-testid="button-age-no"
                    >
                      No
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {verified && children}
    </>
  );
}
