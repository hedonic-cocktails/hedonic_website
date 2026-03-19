import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { z } from "zod";

const insertEventInquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    eventType: z.string().min(1, "Event type is required"),
    date: z.string().min(1, "Date is required"),
    guestCount: z.string().min(1, "Guest count is required"),
    message: z.string().min(1, "Message is required"),
});

type InsertEventInquiry = z.infer<typeof insertEventInquirySchema>;

export function EventInquiryForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<InsertEventInquiry>({
        resolver: zodResolver(insertEventInquirySchema),
        defaultValues: {
            name: "",
            email: "",
            eventType: "Wedding",
            date: "",
            guestCount: "",
            message: "",
        },
    });

    async function onSubmit(data: InsertEventInquiry) {
        setIsSubmitting(true);
        try {
            // Generate mailto link
            const subject = encodeURIComponent(`Private Event Inquiry: ${data.eventType} - ${data.name}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Event Type: ${data.eventType}\n` +
                `Date: ${data.date}\n` +
                `Guest Count: ${data.guestCount}\n\n` +
                `Message:\n${data.message}`
            );

            const mailtoUrl = `mailto:drinklicit@gmail.com?subject=${subject}&body=${body}`;

            // Trigger email client
            window.location.href = mailtoUrl;

            toast({
                title: "Inquiry Generated",
                description: "Opening your email client to send the message to drinklicit@gmail.com.",
            });

            form.reset();
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Failed to process inquiry. Please try emailing drinklicit@gmail.com directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto p-8 rounded-lg bg-card/60 border border-border/40 backdrop-blur-sm shadow-xl">
            <div className="mb-8 text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-3xl tracking-wide mb-2">Request an Event</h3>
                <p className="font-body text-sm text-muted-foreground">Fill out the form below to generate an inquiry email. We'll get back to you to discuss your bespoke cocktail needs.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-body tracking-wider text-xs uppercase">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jane Doe" className="bg-background/50 border-border/50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-body tracking-wider text-xs uppercase">Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="jane@example.com" className="bg-background/50 border-border/50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-body tracking-wider text-xs uppercase">Event Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background/50 border-border/50">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Wedding">Wedding</SelectItem>
                                            <SelectItem value="Corporate">Corporate</SelectItem>
                                            <SelectItem value="Private Party">Private Party</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-body tracking-wider text-xs uppercase">Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" className="bg-background/50 border-border/50 text-foreground" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-body tracking-wider text-xs uppercase">Guests</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 150" className="bg-background/50 border-border/50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-body tracking-wider text-xs uppercase">Message & Details</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about the overall vibe, your favorite spirits, or any his & hers ideas you have."
                                        className="bg-background/50 border-border/50 min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full font-body tracking-widest uppercase h-12"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Generate Email Inquiry"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
