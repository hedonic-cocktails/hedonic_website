import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgonlyyb";

export function WaitlistPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    // Only show if not previously dismissed or successfully subscribed in this session
    const isDismissed = sessionStorage.getItem("waitlist-dismissed");
    if (!isDismissed) {
      // Show shortly after AgeGate passes
      const timer = setTimeout(() => {
        setShow(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("waitlist-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setInputError(true);
      setTimeout(() => setInputError(false), 2000);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.4 }}
           className="fixed inset-0 z-[60] flex items-center justify-center px-6"
           data-testid="waitlist-overlay"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleDismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-lg w-full bg-card border border-border/40 rounded-md p-10 text-center shadow-2xl"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="py-6">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
                  <svg viewBox="0 0 20 20" className="w-8 h-8 text-primary">
                    <path d="M6 10.5L8.5 13L14 7.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl tracking-wide mb-3">
                  You're on the list.<br/><em className="italic text-primary">Permission granted.</em>
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  We'll be in touch soon with your invitation to a private Licit tasting event in Chicago.
                </p>
                <Button onClick={handleDismiss} className="mt-8 font-body text-sm tracking-widest uppercase w-full">
                  Continue Exploring
                </Button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-6 h-6 text-primary" />
                </div>

                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  Founding List
                </p>
                <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-4">
                  Be the first to <em className="italic text-primary">taste it.</em>
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
                  Join the founding list for exclusive private tasting events in Chicago and early access at launch.
                </p>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      autoComplete="email"
                      className={`flex-1 bg-background/50 border ${inputError ? "border-destructive" : "border-border/50"} rounded-md px-4 py-3 font-body text-base text-foreground outline-none focus:border-primary transition-colors`}
                    />
                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="font-body text-sm tracking-widest uppercase py-6 sm:py-3 whitespace-nowrap"
                    >
                      {status === "submitting" ? "Joining..." : "Join"}
                    </Button>
                  </div>
                  {status === "error" && (
                     <p className="text-xs text-destructive mt-2 text-left">Something went wrong. Please try again.</p>
                  )}
                </form>
                
                <p className="font-body text-xs text-muted-foreground/70 italic leading-relaxed">
                  No spam, ever. Your email is used only to send Licit updates and tasting event invitations.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
