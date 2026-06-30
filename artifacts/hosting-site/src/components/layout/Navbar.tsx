import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-6 lg:px-12">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/sovereign-logo.png" alt="Sovereign Engine" className="h-9 w-9 object-contain invert" />
          <span className="font-display font-bold text-lg tracking-[0.2em] uppercase">Sovereign</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hosting</Link>
          <Link href="/payment" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Payment</Link>
          <Link href="/ai" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">AI Platform</Link>
          <Link href="/datacenter" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Data Center</Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
        <Link href="/register">
          <Button variant="default" className="rounded-full px-6">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
