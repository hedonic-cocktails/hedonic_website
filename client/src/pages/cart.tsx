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

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  shippingAddress: z.string().min(10, "Please enter a complete shipping address"),
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
      shippingAddress: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderItems = items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: Number(i.product.price),
      }));
      return apiRequest("POST", "/api/orders", {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        shippingAddress: data.shippingAddress,
        items: JSON.stringify(orderItems),
        total: totalPrice.toFixed(2),
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
              Your Cart is Empty
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Explore our collection and find your perfect cocktail.
            </p>
            <Link href="/#collection">
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
              Thank You
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Your order has been placed. We&apos;ll send a confirmation to your email shortly.
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
                  <span className="text-muted-foreground">Items ({totalItems})</span>
                  <span data-testid="text-subtotal">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4 font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary" data-testid="text-shipping">Free</span>
                </div>
              </div>

              <div className="flex justify-between gap-4 mb-8">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl" data-testid="text-total">${totalPrice.toFixed(2)}</span>
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
                    name="shippingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                          Shipping Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="font-body text-sm bg-background border-border/30"
                            data-testid="input-address"
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs" />
                      </FormItem>
                    )}
                  />
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
