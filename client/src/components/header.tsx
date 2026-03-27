import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/quiz", label: "Find Your Bottle" },
  { href: "/why-licit", label: "Why Licit" },
  { href: "/our-process", label: "Our Process" },
  { href: "/events", label: "Events" },
  { href: "/waitlist", label: "Waitlist" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 h-16">
          <Link href="/">
            <span
              className="flex items-center gap-2.5 cursor-pointer"
              data-testid="link-home"
            >
              <img src="/images/logo-octopus.png" alt="Licit" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl tracking-wide text-foreground">LICIT</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 font-body text-sm tracking-widest uppercase">
            {navLinks.map((link) => {
              if (!["Home", "Collection", "Why Licit"].includes(link.label)) {
                return null;
              }
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`cursor-pointer transition-colors duration-300 ${location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="block"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Background overlay for clicking away */}
            {mobileOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMobileOpen(false)}
              />
            )}

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-56 bg-background/95 backdrop-blur-xl border border-border/40 rounded-md shadow-xl overflow-hidden py-2"
                >
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                    >
                      <Link href={link.href}>
                        <span
                          className={`block px-5 py-3 font-display text-lg tracking-wide transition-colors hover:bg-primary/10 cursor-pointer ${location === link.href ? "text-primary bg-primary/5" : "text-foreground"}`}
                          onClick={() => setMobileOpen(false)}
                          data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  );
}
