import { useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AgeGate } from "@/components/age-gate";
import Home from "@/pages/home";
import Collection from "@/pages/collection";
import Clarity from "@/pages/clarity";
import WhyHedonic from "@/pages/why-hedonic";
import Quiz from "@/pages/quiz";
import ProductDetail from "@/pages/product-detail";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/our-process" component={Clarity} />
        <Route path="/why-hedonic" component={WhyHedonic} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/about">{() => <Redirect to="/why-hedonic" />}</Route>
        <Route path="/compare">{() => <Redirect to="/why-hedonic" />}</Route>
        <Route path="/clarity">{() => <Redirect to="/our-process" />}</Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AgeGate>
          <Header />
          <main className="pt-0">
            <Router />
          </main>
          <Footer />
        </AgeGate>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
