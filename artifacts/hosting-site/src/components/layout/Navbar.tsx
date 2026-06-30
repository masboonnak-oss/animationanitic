import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-6 lg:px-12">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider uppercase">Nova</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Products</Link>
          <Link href="/cloud" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Solutions</Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Support</Link>
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
