import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, Plus, Minus, ArrowLeft } from "lucide-react";
import type { Batch, Product } from "@shared/schema";

export default function Inventory() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        const style = document.createElement("style");
        style.id = "hide-klaviyo";
        style.innerHTML = `
      .klaviyo-form, #licit-popup-overlay, #licit-popup { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
    `;
        document.head.appendChild(style);
        return () => { document.getElementById("hide-klaviyo")?.remove(); };
    }, []);

    useEffect(() => {
        const savedPassword = sessionStorage.getItem("adminPassword");
        if (savedPassword) {
            setPassword(savedPassword);
            checkPassword(savedPassword);
        }
    }, []);

    const checkPassword = async (pass: string) => {
        try {
            const res = await fetch("/api/inventory/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pass }),
            });
            if (res.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem("adminPassword", pass);
            } else {
                toast({
                    title: "Access Denied",
                    description: "Incorrect password",
                    variant: "destructive",
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        checkPassword(password);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center p-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Inventory Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <InventoryDashboard password={password} />;
}

function InventoryDashboard({ password }: { password: string }) {
    const { data: batches = [] } = useQuery<any[]>({
        queryKey: ["/api/inventory"],
        queryFn: async () => {
            const res = await fetch("/api/inventory", {
                headers: { "x-admin-password": password },
            });
            if (!res.ok) throw new Error("Failed to fetch inventory");
            return res.json();
        },
    });

    const activeBatches = batches.filter((b) => b.status === "active");
    const deadBatches = batches.filter((b) => b.status === "dead");

    return (
        <div className="container mx-auto p-4 md:p-8 pt-28 md:pt-36 space-y-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold font-serif text-foreground">Inventory Management</h1>
                <Button variant="outline" asChild className="border-border text-foreground">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Homepage
                    </Link>
                </Button>
            </div>

            <AddBatchForm password={password} />

            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Active Batches</h2>
                {activeBatches.length === 0 ? (
                    <p className="text-muted-foreground italic font-medium">No active batches.</p>
                ) : (
                    <div className="grid gap-4">
                        {activeBatches.map((batch) => (
                            <BatchRow key={batch.id} batch={batch} password={password} />
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-8 space-y-4 border-t border-[#f4c244]/30">
                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="p-0 hover:bg-transparent font-serif text-xl font-semibold flex items-center gap-2 group text-foreground">
                            Dead Batches
                            <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                        {deadBatches.length === 0 ? (
                            <p className="text-muted-foreground italic font-medium">No dead batches.</p>
                        ) : (
                            <div className="grid gap-2 text-sm text-muted-foreground font-medium">
                                {deadBatches.map((batch) => (
                                    <div key={batch.id} className="flex justify-between border-b border-border pb-2">
                                        <span>{batch.name} ({batch.productName})</span>
                                        <span>Started: {new Date(batch.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
}

function AddBatchForm({ password }: { password: string }) {
    const [productId, setProductId] = useState("");
    const [newRecipeName, setNewRecipeName] = useState("");
    const [name, setName] = useState("");
    const { toast } = useToast();

    const { data: products = [] } = useQuery<Product[]>({
        queryKey: ["/api/products"],
    });

    const filteredProducts = products.filter(p => !["lovingly-light", "dark-and-seductive"].includes(p.slug));

    const addBatch = useMutation({
        mutationFn: async (data: { name: string; productId: string }) => {
            const res = await fetch("/api/inventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to add batch");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
            setProductId("");
            setName("");
            setNewRecipeName("");
            toast({ title: "Batch added" });
        },
        onError: () => {
            toast({ title: "Error adding batch", variant: "destructive" });
        },
    });

    const createRecipe = useMutation({
        mutationFn: async (recipeName: string) => {
            const res = await fetch("/api/inventory/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify({ name: recipeName }),
            });
            if (!res.ok) throw new Error("Failed to create recipe");
            return res.json();
        },
        onSuccess: (newProduct) => {
            queryClient.invalidateQueries({ queryKey: ["/api/products"] });
            addBatch.mutate({ name, productId: newProduct.id });
        },
        onError: () => {
            toast({ title: "Error creating recipe", variant: "destructive" });
        }
    });

    const handleAdd = () => {
        if (productId === "new") {
            createRecipe.mutate(newRecipeName);
        } else {
            addBatch.mutate({ name, productId });
        }
    };

    const isAdding = addBatch.isPending || createRecipe.isPending;
    const isFormValid = name && (productId === "new" ? newRecipeName : productId);

    return (
        <Card className="border-[#f4c244] shadow-md border-opacity-50 flex flex-col gap-4 p-6 bg-card">
            <h3 className="font-serif text-xl font-semibold text-foreground">Log New Batch</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="space-y-2 flex-grow">
                    <Label>Recipe Type</Label>
                    <Select value={productId} onValueChange={setProductId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select cocktail..." />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredProducts.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                            <SelectItem value="new" className="text-[#f4c244] font-bold">+ Create New Recipe</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {productId === "new" && (
                    <div className="space-y-2 flex-grow">
                        <Label>New Recipe Name</Label>
                        <Input
                            value={newRecipeName}
                            onChange={(e) => setNewRecipeName(e.target.value)}
                            placeholder="e.g. Pina Colada"
                        />
                    </div>
                )}

                <div className="space-y-2 flex-grow">
                    <Label>Batch Name / Identifier</Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Batch #42"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <Button
                    onClick={handleAdd}
                    disabled={!isFormValid || isAdding}
                    className="w-full sm:w-auto rounded-none shadow-[2px_2px_0px_#f4c244] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_#f4c244] transition-all"
                >
                    {isAdding ? "Adding..." : "Add Batch"}
                </Button>
            </div>
        </Card>
    );
}

function BatchRow({ batch, password }: { batch: any; password: string }) {
    const { toast } = useToast();

    const updateBatch = useMutation({
        mutationFn: async (updates: Partial<Batch>) => {
            const res = await fetch(`/api/inventory/${batch.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify(updates),
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
        },
        onError: () => {
            toast({ title: "Failed to update", variant: "destructive" });
        },
    });

    const handleUpdate = (field: "bottles750ml" | "bottles187ml", val: number) => {
        if (val < 0) return;
        updateBatch.mutate({ [field]: val });
    };

    return (
        <Card className="flex flex-col md:flex-row items-center justify-between p-4 px-6 border-border bg-card">
            <div className="flex-grow w-full md:w-auto mb-4 md:mb-0">
                <h3 className="font-serif text-lg font-bold text-foreground">{batch.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{batch.productName}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-12 w-full md:w-auto items-center">
                <div className="flex flex-col items-center gap-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">750 mL</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-border"
                            onClick={() => handleUpdate("bottles750ml", batch.bottles750ml - 1)}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={batch.bottles750ml}
                            onChange={(e) => handleUpdate("bottles750ml", parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-[#f4c244] bg-[#f4c244]/10 hover:bg-[#f4c244]/20 text-foreground"
                            onClick={() => handleUpdate("bottles750ml", batch.bottles750ml + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">187 mL</Label>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-border"
                            onClick={() => handleUpdate("bottles187ml", batch.bottles187ml - 1)}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={batch.bottles187ml}
                            onChange={(e) => handleUpdate("bottles187ml", parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-[#f4c244] bg-[#f4c244]/10 hover:bg-[#f4c244]/20 text-foreground"
                            onClick={() => handleUpdate("bottles187ml", batch.bottles187ml + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Button
                    variant="destructive"
                    className="w-full md:w-auto font-semibold text-xs py-1 h-8 rounded-none transition-all shadow-[2px_2px_0px_rgba(239,68,68,0.7)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_rgba(239,68,68,0.7)]"
                    onClick={() => updateBatch.mutate({ status: "dead" })}
                >
                    Mark Dead
                </Button>
            </div>
        </Card>
    );
}
