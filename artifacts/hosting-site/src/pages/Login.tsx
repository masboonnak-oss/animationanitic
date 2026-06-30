import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLogin } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCards } from "@/components/ui/AnimatedCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: () => {
        setLocation("/dashboard");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 blur-sm pointer-events-none">
        <AnimatedCards />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:p-[1px] before:content-[''] before:[mask-image:linear-gradient(black,black)] before:[mask-composite:exclude]"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-background rounded-full" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wider uppercase">Nova</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Sign in to Nova</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" {...form.register("email")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Forgot Password?</a>
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

          <Button type="submit" className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-4 text-xs text-muted-foreground uppercase tracking-wider">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white">
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
