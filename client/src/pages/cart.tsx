import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.04, AK: 0, AZ: 0.056, AR: 0.065, CA: 0.0725,
  CO: 0.029, CT: 0.0635, DE: 0, DC: 0.06, FL: 0.06,
  GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
  IA: 0.06, KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055,
  MD: 0.06, MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07,
  MO: 0.04225, MT: 0, NE: 0.055, NV: 0.0685, NH: 0,
  NJ: 0.06625, NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05,
  OH: 0.0575, OK: 0.045, OR: 0, PA: 0.06, RI: 0.07,
  SC: 0.06, SD: 0.042, TN: 0.07, TX: 0.0625, UT: 0.061,
  VT: 0.06, VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04,
};

function getTaxRate(stateInput: string): number {
  const normalized = stateInput.trim().toUpperCase();
  return STATE_TAX_RATES[normalized] ?? 0;
}

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  streetAddress: z.string().min(3, "Please enter your street address"),
  streetAddress2: z.string().optional(),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please select your state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
  cardNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Please enter a valid 16-digit card number"),
  expiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please enter a valid date (MM/YY)"),
  ccv: z.string().regex(/^\d{3,4}$/, "Please enter a valid CCV"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiration: "",
      ccv: "",
    },
  });

  const watchedState = form.watch("state");
  const taxRate = getTaxRate(watchedState || "");
  const taxAmount = totalPrice * taxRate;
  const orderTotal = totalPrice + taxAmount;

  const orderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderItems = items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: Number(i.product.price),
      }));
      const shippingAddress = [
        data.streetAddress,
        data.streetAddress2,
        `${data.city}, ${data.state} ${data.zipCode}`,
      ].filter(Boolean).join(", ");
      return apiRequest("POST", "/api/orders", {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        shippingAddress,
        items: JSON.stringify(orderItems),
        total: orderTotal.toFixed(2),
      });
    },
    onSuccess: () => {
      clearCart();
      form.reset();
      toast({
        title: "Order Placed",
        description: "Thank you for your order! We'll be in touch shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    orderMutation.mutate(data);
  };

  if (items.length === 0 && !orderMutation.isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 px-6">
        <div className="max-w-2xl mx-auto text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full border border-border/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl tracking-wide mb-4" data-testid="text-empty-cart">
              Nothing Here Yet
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Your evening deserves better than an empty glass. Go find something irresistible.
            </p>
            <Link href="/collection">
              <Button className="font-body text-sm tracking-widest uppercase" data-testid="button-browse">
                Browse Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderMutation.isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24 px-6">
        <div className="max-w-2xl mx-auto text-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-3xl tracking-wide mb-4" data-testid="text-order-success">
              Consider Yourself <span className="italic text-primary">Indulged</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Your order is on its way. Anticipation is half the pleasure — we&apos;ll send a confirmation to your email shortly.
            </p>
            <Link href="/">
              <Button className="font-body text-sm tracking-widest uppercase" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8" data-testid="link-back-cart">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </span>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl tracking-wide mb-12 mt-8"
          data-testid="text-cart-title"
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="p-4 border-border/30 bg-card/50">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 rounded-md overflow-hidden bg-card flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-${item.product.slug}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-body text-xs tracking-[0.15em] uppercase text-primary">
                            {item.product.spirit}
                          </p>
                          <h3 className="font-display text-lg tracking-wide" data-testid={`text-cart-item-${item.product.slug}`}>
                            {item.product.name}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground"
                          data-testid={`button-remove-${item.product.slug}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-4 mt-3">
                        <div className="flex items-center border border-border/30 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            data-testid={`button-cart-minus-${item.product.slug}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-body text-sm" data-testid={`text-cart-qty-${item.product.slug}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            data-testid={`button-cart-plus-${item.product.slug}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-display text-lg" data-testid={`text-cart-subtotal-${item.product.slug}`}>
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 border-border/30 bg-card/50 sticky top-24">
              <h3 className="font-display text-xl tracking-wide mb-6" data-testid="text-order-summary">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border/20">
                <div className="flex justify-between gap-4 font-body text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                  <span data-testid="text-subtotal">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4 font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary" data-testid="text-shipping">Free</span>
                </div>
                <div className="flex justify-between gap-4 font-body text-sm">
                  <span className="text-muted-foreground">
                    Tax{taxRate > 0 ? ` (${(taxRate * 100).toFixed(2)}%)` : ""}
                  </span>
                  <span data-testid="text-tax">
                    {taxRate > 0 ? `$${taxAmount.toFixed(2)}` : <span className="text-muted-foreground/50">TBD</span>}
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-4 mb-8">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl" data-testid="text-total">${orderTotal.toFixed(2)}</span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          Street Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123 Main St"
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-street-address"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="streetAddress2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          Street Address 2
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Apt, Suite, Unit (optional)"
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-street-address-2"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-city"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            State
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="CA"
                              className="font-body text-sm bg-background border-border/30"
                              data-testid="input-state"
                            />
                          </FormControl>
                          <FormMessage className="font-body text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            Zip Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="90210"
                              className="font-body text-sm bg-background border-border/30"
                              data-testid="input-zip-code"
                            />
                          </FormControl>
                          <FormMessage className="font-body text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="border-t border-border/20 pt-4 mt-4">
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                      Payment
                    </p>
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            Card Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="font-body text-sm bg-background border-border/30"
                              data-testid="input-card-number"
                            />
                          </FormControl>
                          <FormMessage className="font-body text-xs" />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="expiration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                              Expiration Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="font-body text-sm bg-background border-border/30"
                                data-testid="input-expiration"
                              />
                            </FormControl>
                            <FormMessage className="font-body text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ccv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                              CCV
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="123"
                                maxLength={4}
                                className="font-body text-sm bg-background border-border/30"
                                data-testid="input-ccv"
                              />
                            </FormControl>
                            <FormMessage className="font-body text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-body text-sm tracking-widest uppercase mt-2"
                    disabled={orderMutation.isPending}
                    data-testid="button-place-order"
                  >
                    {orderMutation.isPending ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
