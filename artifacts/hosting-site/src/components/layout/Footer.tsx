import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 py-12 px-6 lg:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-5 h-5 bg-primary rounded-sm rotate-45" />
            <span className="font-display font-bold text-lg tracking-wider uppercase">Nova</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Enterprise cloud infrastructure for the next generation of software.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <div className="flex flex-col space-y-2">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">Cloud VPS</Link>
            <Link href="/dedicated" className="text-sm text-muted-foreground hover:text-foreground">Dedicated</Link>
            <Link href="/colocation" className="text-sm text-muted-foreground hover:text-foreground">Colocation</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <div className="flex flex-col space-y-2">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">Status</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
