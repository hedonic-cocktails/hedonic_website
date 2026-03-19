import { motion } from "framer-motion";
import { GlassWater, Sparkles, Heart } from "lucide-react";

export function EventsSection() {
    const perks = [
        {
            icon: Heart,
            title: "His & Hers",
            description: "Custom clarified variations of your favorite classic cocktails, designed specifically for you and your partner to share with guests."
        },
        {
            icon: Sparkles,
            title: "Crystal Clear Elegance",
            description: "Our signature milk-washed cocktails match the elegance of your event. No cloudy mixers, just perfectly translucent, visually striking drinks."
        },
        {
            icon: GlassWater,
            title: "Effortless Service",
            description: "Pre-batched, carbonated, and ready to pour. Give your wedding bartender the easiest, fastest, and most premium pour of their night."
        }
    ];

    return (
        <section className="py-24 px-6 border-t border-border/20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4" data-testid="text-private-events-label">
                        Elevate Your Event
                    </p>
                    <h2 className="font-display text-5xl md:text-6xl tracking-wide mb-4" data-testid="text-private-events-title">
                        Custom Serves
                    </h2>
                    <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
                        From luxury wedding receptions to high-end corporate gatherings, provide an unforgettably smooth drink experience that looks as beautiful as it tastes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {perks.map((perk, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center flex flex-col items-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-primary/20">
                                <perk.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl tracking-wide mb-3">{perk.title}</h3>
                            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-sm">
                                {perk.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
