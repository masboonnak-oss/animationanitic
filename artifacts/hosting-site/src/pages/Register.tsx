import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useRegister } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCards } from "@/components/ui/AnimatedCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  const registerMutation = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate({ 
      data: { name: data.name, email: data.email, password: data.password } 
    }, {
      onSuccess: () => {
        toast({ title: "Registration successful" });
        setLocation("/dashboard");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Registration failed",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center relative overflow-hidden py-12">
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

        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

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
            <Checkbox id="terms" onCheckedChange={(checked) => form.setValue("terms", checked as true)} className="mt-1" />
            <label htmlFor="terms" className="text-sm font-medium leading-snug text-muted-foreground">
              I agree to the <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>
            </label>
          </div>
          {form.formState.errors.terms && <p className="text-sm text-red-500">{form.formState.errors.terms.message}</p>}

          <Button type="submit" className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-white hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
