import { SiInstagram, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo-octopus.png" alt="Hedonic" className="w-10 h-10 object-contain" />
              <h3 className="font-display text-2xl tracking-wide" data-testid="text-footer-brand">HEDONIC</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium ready-to-drink cocktails crafted with the finest spirits and ingredients. Luxury in every sip.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Navigate</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><a href="/" className="text-foreground/70 hover:text-primary transition-colors duration-300" data-testid="link-footer-home">Home</a></li>
              <li><a href="/collection" className="text-foreground/70 hover:text-primary transition-colors duration-300" data-testid="link-footer-collection">Collection</a></li>
              <li><a href="/about" className="text-foreground/70 hover:text-primary transition-colors duration-300" data-testid="link-footer-story">Our Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-300" data-testid="link-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-300" data-testid="link-twitter">
                <SiX className="w-5 h-5" />
              </a>
            </div>
            <p className="font-body text-xs text-muted-foreground mt-6">
              hello@hedoniccocktails.com
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Hedonic Cocktails. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Must be 21+ to purchase. Please drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
