import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useRef, useState, createContext, useContext } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { CircularNav } from "@/components/ui/CircularNav";
import { AIAssistant } from "@/components/ui/AIAssistant";

// Route pages are code-split so the initial bundle stays small and the first
// paint is fast; each page chunk loads on demand during navigation.
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Products = lazy(() => import("@/pages/Products"));
const Dedicated = lazy(() => import("@/pages/Dedicated"));
const Cloud = lazy(() => import("@/pages/Cloud"));
const Colocation = lazy(() => import("@/pages/Colocation"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Status = lazy(() => import("@/pages/Status"));
const Payment = lazy(() => import("@/pages/Payment"));
const AIPage = lazy(() => import("@/pages/AI"));
const DataCenter = lazy(() => import("@/pages/DataCenter"));
const Organizations = lazy(() => import("@/pages/Organizations"));
const DemoLegal = lazy(() => import("@/pages/DemoLegal"));
const Admin = lazy(() => import("@/pages/Admin"));
const Topup = lazy(() => import("@/pages/Topup"));
const Orbit = lazy(() => import("@/pages/Orbit"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();
type Direction = [number, number];

const DirectionCtx = createContext<Direction>([1, 0]);

const pagePositions: Record<string, Direction> = {
  "/": [0, 0],
  "/home": [0, 1],
  "/products": [0, -1],
  "/dedicated": [0, -2],
  "/cloud": [1, -2],
  "/colocation": [1, -1],
  "/payment": [-1, 0],
  "/topup": [-2, 0],
  "/orbit": [0, -3],
  "/ai": [1, 0],
  "/datacenter": [2, 0],
  "/organizations": [-1, -1],
  "/login": [-1, 1],
  "/register": [0, 1],
  "/dashboard": [1, 1],
  "/admin": [2, 1],
  "/about": [0, 2],
  "/contact": [1, 2],
  "/status": [-1, 2],
  "/privacy": [-2, 1],
  "/terms": [-2, 2],
  "/compliance": [-2, 3],
};

function getSlideDir(from: string, to: string): Direction {
  const fromPos = pagePositions[from] ?? pagePositions["/"];
  const toPos = pagePositions[to] ?? pagePositions["/"];
  const dx = toPos[0] - fromPos[0];
  const dy = toPos[1] - fromPos[1];

  return [Math.sign(dx) || 0, Math.sign(dy) || 0];
}

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
  const [dirX, dirY] = useContext(DirectionCtx);
  const reduceMotion = useReducedMotion();
  const isVertical = Math.abs(dirY) > Math.abs(dirX);
  const originX = dirX > 0 ? "left" : dirX < 0 ? "right" : "center";
  const originY = dirY > 0 ? "top" : dirY < 0 ? "bottom" : "center";

  return (
    <motion.div
      initial={reduceMotion ? {
        opacity: 0,
      } : {
        x: `${dirX * 112}%`,
        y: `${dirY * 112}%`,
        opacity: 0,
        scale: 0.985,
        rotateX: dirY * -9,
        rotateY: dirX * 9,
        rotateZ: isVertical ? dirY * 1.4 : dirX * -1.4,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      }}
      exit={reduceMotion ? {
        opacity: 0,
      } : {
        x: `${dirX * -46}%`,
        y: `${dirY * -46}%`,
        opacity: 0,
        scale: 0.96,
        rotateX: dirY * 7,
        rotateY: dirX * -7,
        rotateZ: isVertical ? dirY * -1 : dirX,
      }}
      transition={reduceMotion ? {
        duration: 0.18,
        ease: "linear",
      } : {
        x: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        rotateX: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        rotateY: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        rotateZ: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.28, ease: "linear" },
      }}
      style={{
        perspective: "1400px",
        transformOrigin: `${originX} ${originY}`,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.32 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.18 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-[999] bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.2))]"
      />
      <Suspense fallback={<div className="min-h-screen bg-[#111111]" />}>
        {children}
      </Suspense>
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
          <Route path="/"              component={() => <PageWrapper><Orbit /></PageWrapper>} />
          <Route path="/home"          component={() => <PageWrapper><Home /></PageWrapper>} />
          <Route path="/login"         component={() => <PageWrapper><Login /></PageWrapper>} />
          <Route path="/register"      component={() => <PageWrapper><Register /></PageWrapper>} />
          <Route path="/dashboard"     component={() => <PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/admin"         component={() => <PageWrapper><Admin /></PageWrapper>} />
          <Route path="/products"      component={() => <PageWrapper><Products /></PageWrapper>} />
          <Route path="/dedicated"     component={() => <PageWrapper><Dedicated /></PageWrapper>} />
          <Route path="/cloud"         component={() => <PageWrapper><Cloud /></PageWrapper>} />
          <Route path="/colocation"    component={() => <PageWrapper><Colocation /></PageWrapper>} />
          <Route path="/about"         component={() => <PageWrapper><About /></PageWrapper>} />
          <Route path="/contact"       component={() => <PageWrapper><Contact /></PageWrapper>} />
          <Route path="/status"        component={() => <PageWrapper><Status /></PageWrapper>} />
          <Route path="/payment"       component={() => <PageWrapper><Payment /></PageWrapper>} />
          <Route path="/topup"         component={() => <PageWrapper><Topup /></PageWrapper>} />
          <Route path="/orbit"         component={() => <PageWrapper><Orbit /></PageWrapper>} />
          <Route path="/ai"            component={() => <PageWrapper><AIPage /></PageWrapper>} />
          <Route path="/datacenter"    component={() => <PageWrapper><DataCenter /></PageWrapper>} />
          <Route path="/organizations" component={() => <PageWrapper><Organizations /></PageWrapper>} />
          <Route path="/privacy"       component={() => <PageWrapper><DemoLegal title="Privacy Policy" eyebrow="Demo legal page" /></PageWrapper>} />
          <Route path="/terms"         component={() => <PageWrapper><DemoLegal title="Terms of Service" eyebrow="Demo legal page" /></PageWrapper>} />
          <Route path="/compliance"    component={() => <PageWrapper><DemoLegal title="Compliance" eyebrow="Demo trust page" /></PageWrapper>} />
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
