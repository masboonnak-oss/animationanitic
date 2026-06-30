import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Building2, Users, Shield, Key, FileText, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Organizations() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a0a]/30 via-transparent to-[#0a0a1a]/30" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>Organization Management</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.05]">
            Your Team.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/40">Your Rules.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">Enterprise-grade organization management with role-based access, SSO, audit trails, and multi-team resource isolation — all in one place.</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register"><button className="rounded-full px-8 h-12 bg-white text-black font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"><span>Create Organization</span><ArrowRight className="w-4 h-4"/></button></Link>
            <Link href="/contact"><button className="rounded-full px-8 h-12 border border-white/20 text-white font-medium hover:bg-white/5 transition-all">Enterprise Sales</button></Link>
          </div>
        </motion.div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: Users, title: "Multi-Team Workspaces", desc: "Create isolated workspaces for each team — Dev, Ops, Finance, Security. Each with dedicated resource quotas, billing, and access policies.", features: ["Unlimited sub-organizations", "Per-team billing", "Resource quotas", "Custom roles"] },
            { icon: Shield, title: "Role-Based Access Control", desc: "Granular RBAC with over 200 permission scopes. Design the exact access model your security policy demands.", features: ["Custom roles", "Permission inheritance", "Resource-level access", "Time-bound access"] },
            { icon: Key, title: "Enterprise SSO", desc: "Integrate with any SAML 2.0 or OIDC-compatible identity provider. Okta, Azure AD, Google Workspace, and more.", features: ["SAML 2.0 / OIDC", "Auto-provision users", "JIT provisioning", "MFA enforcement"] },
            { icon: FileText, title: "Audit & Compliance", desc: "Immutable audit logs for every action across your organization. Export for SOC2, ISO 27001, and GDPR compliance workflows.", features: ["Immutable audit trail", "SOC2 ready", "GDPR tooling", "Real-time alerts"] },
          ].map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-10 rounded-3xl bg-[#161616] border border-white/5 hover:border-white/10 transition-all group">
              <f.icon className="w-10 h-10 mb-6 text-white/30 group-hover:text-white/70 transition-colors" />
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{f.desc}</p>
              <ul className="space-y-2">
                {f.features.map((feat, j) => (
                  <li key={j} className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}