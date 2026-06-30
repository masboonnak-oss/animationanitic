import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// UI Additions
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CircularNav } from "@/components/ui/CircularNav";
import { AIAssistant } from "@/components/ui/AIAssistant";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Dedicated from "@/pages/Dedicated";
import Cloud from "@/pages/Cloud";
import Colocation from "@/pages/Colocation";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Status from "@/pages/Status";
import Payment from "@/pages/Payment";
import AIPage from "@/pages/AI";
import DataCenter from "@/pages/DataCenter";
import Organizations from "@/pages/Organizations";

const queryClient = new QueryClient();

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch location={location} key={location}>
        <Route path="/" component={() => <PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" component={() => <PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" component={() => <PageWrapper><Register /></PageWrapper>} />
        <Route path="/dashboard" component={() => <PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/products" component={() => <PageWrapper><Products /></PageWrapper>} />
        <Route path="/dedicated" component={() => <PageWrapper><Dedicated /></PageWrapper>} />
        <Route path="/cloud" component={() => <PageWrapper><Cloud /></PageWrapper>} />
        <Route path="/colocation" component={() => <PageWrapper><Colocation /></PageWrapper>} />
        <Route path="/about" component={() => <PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" component={() => <PageWrapper><Contact /></PageWrapper>} />
        <Route path="/status" component={() => <PageWrapper><Status /></PageWrapper>} />
        <Route path="/payment" component={() => <PageWrapper><Payment /></PageWrapper>} />
        <Route path="/ai" component={() => <PageWrapper><AIPage /></PageWrapper>} />
        <Route path="/datacenter" component={() => <PageWrapper><DataCenter /></PageWrapper>} />
        <Route path="/organizations" component={() => <PageWrapper><Organizations /></PageWrapper>} />
        <Route component={() => <PageWrapper><NotFound /></PageWrapper>} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  // Force dark mode for this specific enterprise aesthetic
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CustomCursor />
          <CircularNav />
          <AIAssistant />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;