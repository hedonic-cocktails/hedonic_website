import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/our-process", label: "Our Process" },
  { href: "/why-hedonic", label: "Why Hedonic" },
  { href: "/quiz", label: "Find Your Bottle" },
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
              <img src="/images/logo-octopus.png" alt="Hedonic" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl tracking-wide text-foreground">HEDONIC</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`cursor-pointer transition-colors duration-300 ${location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="relative pt-20 px-8 flex flex-col gap-1"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block py-4 font-display text-2xl tracking-wide cursor-pointer transition-colors border-b border-border/20 ${location === link.href ? "text-primary" : "text-foreground"}`}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
