import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCards } from "@/components/ui/AnimatedCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { demoAdminLogin, demoLogin, getDemoUser, saveDemoSession } from "@/lib/demo-auth";
import { LogoChip, LogoDecor } from "@/components/ui/LogoDecor";

const loginSchema = z.object({
  email: z.string().min(1, "Enter your email or username"),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const user = getDemoUser();
    if (user) {
      setLocation(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [setLocation]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    const isAdmin = data.email.trim().toLowerCase() === "admin" && data.password === "admin123";
    const user = isAdmin ? demoAdminLogin() : demoLogin(data.email);
    saveDemoSession(user);
    toast({
      title: "Signed in",
      description: `Welcome back, ${user.name}.`,
    });
    setLocation(user.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#111111] px-4 py-24 sm:px-6">
      <div className="absolute inset-0 opacity-30 blur-sm pointer-events-none">
        <AnimatedCards />
      </div>
      <LogoDecor className="right-[-120px] top-20 h-80 w-80 opacity-50" glowClassName="bg-[var(--neon-blue)]/12" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#1a1a1a]/80 p-5 shadow-2xl backdrop-blur-xl before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:p-[1px] before:content-[''] before:[mask-image:linear-gradient(black,black)] before:[mask-composite:exclude] sm:p-8"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <LogoChip className="h-9 w-9" />
            <span className="font-display font-bold text-2xl tracking-wider uppercase">Sovereign</span>
          </Link>
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold">Sign in to Sovereign</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email or username</Label>
            <Input id="email" placeholder="admin or name@company.com" {...form.register("email")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-white transition-colors">Forgot Password?</Link>
            </div>
            <Input id="password" type="password" {...form.register("password")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox id="rememberMe" onCheckedChange={(checked) => form.setValue("rememberMe", checked === true)} />
            <label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium">
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-4 text-xs text-muted-foreground uppercase tracking-wider">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-3">
          <Button type="button" onClick={() => {
            const user = demoLogin("demo@sovereign.local");
            saveDemoSession(user);
            toast({ title: "Demo session ready", description: "Signed in with a sample account." });
            setLocation("/dashboard");
          }} variant="outline" className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white">
            Continue with Google
          </Button>
          <Button type="button" onClick={() => {
            const user = demoLogin("builder@sovereign.local");
            saveDemoSession(user);
            toast({ title: "Demo session ready", description: "Signed in with a sample account." });
            setLocation("/dashboard");
          }} variant="outline" className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white">
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don't have an account? <Link href="/register" className="text-white hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
