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
import { getDemoUser, makeDemoUser, saveDemoSession } from "@/lib/demo-auth";
import { LogoChip, LogoDecor } from "@/components/ui/LogoDecor";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const user = getDemoUser();
    if (user) {
      setLocation(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [setLocation]);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false as unknown as true,
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const user = makeDemoUser(data.name, data.email);
    saveDemoSession(user);
    toast({
      title: "Account created",
      description: "Your demo workspace is ready.",
    });
    setLocation("/dashboard");
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#111111] px-4 py-24 sm:px-6">
      <div className="absolute inset-0 opacity-30 blur-sm pointer-events-none">
        <AnimatedCards />
      </div>
      <LogoDecor className="left-[-120px] top-24 h-80 w-80 opacity-50" glowClassName="bg-[var(--neon-purple)]/12" />

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

        <h2 className="text-2xl font-bold text-center mb-6">Create your Sovereign account</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...form.register("name")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="name@company.com" {...form.register("email")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} className="bg-black/50 border-white/10 focus-visible:ring-white/20" />
            {form.formState.errors.confirmPassword && <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-start space-x-2 py-2">
            <Checkbox id="terms" onCheckedChange={(checked) => form.setValue("terms", checked as true, { shouldValidate: true })} className="mt-1" />
            <label htmlFor="terms" className="text-sm font-medium leading-snug text-muted-foreground">
              I agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>
            </label>
          </div>
          {form.formState.errors.terms && <p className="text-sm text-red-500">{form.formState.errors.terms.message}</p>}

          <Button type="submit" className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-white hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
