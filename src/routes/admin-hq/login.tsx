import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { loginAdmin } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, User } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/admin-hq/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/admin-hq/login" });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await loginAdmin({ data: form });
      toast.success("Welcome back, Ashdeep!");
      navigate({ to: redirect || "/admin-hq" });
    } catch (error) {
      toast.error("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-transparent)_0%,transparent_70%)] opacity-20" />
      
      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display font-black text-3xl shadow-[0_0_40px_-5px_var(--color-primary)]">
            G
          </div>
          <h1 className="mt-8 font-display text-4xl font-black tracking-tight text-white">
            Access <span className="text-primary">HQ.</span>
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
            Enter credentials to enter command center
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Username</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="bg-white/5 border-white/10 pl-11 h-12 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  placeholder="ashdeep"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="bg-white/5 border-white/10 pl-11 h-12 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_30px_-5px_var(--color-primary)]"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Initiate Login"}
          </Button>
        </form>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
          SECURE ENCRYPTED ACCESS ONLY
        </p>
      </div>
    </div>
  );
}
