import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CircularNav } from "@/components/ui/CircularNav";
import { AIAssistant } from "@/components/ui/AIAssistant";

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

/**
 * 2D spatial map of pages.
 * Think of it as a city grid — navigating between pages
 * slides the viewport in the direction of the destination.
 *
 *           /status (-0.5,-2)      /ai (0,-1)     /datacenter (0.5,-1)
 *
 * /login (-1,0)     /  (0,0)    /products (1,0)   /dedicated (2,0)
 *
 *  /organizations(-1,0.5)       /cloud (1,-0.5)   /colocation (1.5,0.5)
 *
 *  /payment (-1.5,0)            /about (0,1)      /contact (1,1)
 *
 *                              /register (-0.5,1.5)
 *                              /dashboard (2.5,0)
 */
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        x: "100%",
        opacity: 0,
        scale: 0.97,
        rotateY: 6,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
      }}
      exit={{
        x: "-18%",
        opacity: 0,
        scale: 0.91,
        rotateY: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 32,
        mass: 0.85,
        opacity: { duration: 0.15, ease: "easeOut" },
      }}
      style={{ perspective: "1200px", transformOrigin: "left center" }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  const prevRef = useRef(location);
  const [dir, setDir] = useState<[number, number]>([1, 0]);

  useEffect(() => {
    if (prevRef.current !== location) {
      setDir(getSlideDir(prevRef.current, location));
      prevRef.current = location;
    }
  }, [location]);

  return (
    <DirectionCtx.Provider value={dir}>
      <AnimatePresence mode="wait" initial={false}>
        <Switch location={location} key={location}>
          <Route path="/"              component={() => <PageWrapper><Home /></PageWrapper>} />
          <Route path="/login"         component={() => <PageWrapper><Login /></PageWrapper>} />
          <Route path="/register"      component={() => <PageWrapper><Register /></PageWrapper>} />
          <Route path="/dashboard"     component={() => <PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/products"      component={() => <PageWrapper><Products /></PageWrapper>} />
          <Route path="/dedicated"     component={() => <PageWrapper><Dedicated /></PageWrapper>} />
          <Route path="/cloud"         component={() => <PageWrapper><Cloud /></PageWrapper>} />
          <Route path="/colocation"    component={() => <PageWrapper><Colocation /></PageWrapper>} />
          <Route path="/about"         component={() => <PageWrapper><About /></PageWrapper>} />
          <Route path="/contact"       component={() => <PageWrapper><Contact /></PageWrapper>} />
          <Route path="/status"        component={() => <PageWrapper><Status /></PageWrapper>} />
          <Route path="/payment"       component={() => <PageWrapper><Payment /></PageWrapper>} />
          <Route path="/ai"            component={() => <PageWrapper><AIPage /></PageWrapper>} />
          <Route path="/datacenter"    component={() => <PageWrapper><DataCenter /></PageWrapper>} />
          <Route path="/organizations" component={() => <PageWrapper><Organizations /></PageWrapper>} />
          <Route component={() => <PageWrapper><NotFound /></PageWrapper>} />
        </Switch>
      </AnimatePresence>
    </DirectionCtx.Provider>
  );
}

function App() {
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
