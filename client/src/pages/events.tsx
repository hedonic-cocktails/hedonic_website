import { EventsSection } from "@/components/events-section";
import { EventInquiryForm } from "@/components/event-inquiry-form";
import { motion } from "framer-motion";

export default function Events() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-16">
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-6" data-testid="text-events-hero-label">
                            Private Events
                        </p>
                        <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-tight mb-6" data-testid="text-events-hero-title">
                            Bespoke <span className="italic text-primary">Service</span>
                        </h1>
                        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-events-hero-subtitle">
                            Bring the refinement of Licit to your wedding, corporate gathering, or private party. We offer custom variations and His & Hers cocktails perfectly batched for your guests.
                        </p>
                    </motion.div>
                </div>
            </section>

            <EventsSection />

            <section className="py-24 px-6 border-t border-border/20 relative" id="inquiry-form">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <EventInquiryForm />
                </div>
            </section>
        </div>
    );
}
