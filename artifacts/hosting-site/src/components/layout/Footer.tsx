import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 py-16 px-6 lg:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/sovereign-logo.png" alt="Sovereign Engine" className="h-8 w-8 object-contain invert" />
              <span className="font-display font-bold tracking-[0.2em] uppercase text-sm">Sovereign</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Enterprise-grade infrastructure, payments, and AI — unified under one platform.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Hosting</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cloud VPS</Link>
              <Link href="/dedicated" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dedicated</Link>
              <Link href="/colocation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Colocation</Link>
              <Link href="/cloud" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cloud</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/payment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payment Gateway</Link>
              <Link href="/ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Platform</Link>
              <Link href="/datacenter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Data Center</Link>
              <Link href="/organizations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Organizations</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Status</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compliance</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Sovereign Technologies. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Regulated · Secure · Enterprise-Grade</p>
        </div>
      </div>
    </footer>
  );
}