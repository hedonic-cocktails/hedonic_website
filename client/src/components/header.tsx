import { Link, useLocation } from "wouter";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";

export function Header() {
  const { totalItems } = useCart();
  const [location] = useLocation();

  return (
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
          <Link href="/">
            <span
              className={`cursor-pointer transition-colors duration-300 ${location === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-nav-home"
            >
              Home
            </span>
          </Link>
          <Link href="/collection">
            <span
              className={`cursor-pointer transition-colors duration-300 ${location === "/collection" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-nav-collection"
            >
              Collection
            </span>
          </Link>
          <Link href="/about">
            <span
              className={`cursor-pointer transition-colors duration-300 ${location === "/about" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-nav-story"
            >
              Our Story
            </span>
          </Link>
          <Link href="/compare">
            <span
              className={`cursor-pointer transition-colors duration-300 ${location === "/compare" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-nav-compare"
            >
              Hedonic at Home
            </span>
          </Link>
        </nav>

        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold flex items-center justify-center" data-testid="text-cart-count">
                {totalItems}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </motion.header>
  );
}
