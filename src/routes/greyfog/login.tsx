import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Code, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/greyfog/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay for the aesthetic
    await new Promise((r) => setTimeout(r, 800));

    if (username === "ashdeep" && password === "Ashdeep@9842") {
      // Set simple cookie for MVP
      document.cookie = "admin_session=true; path=/; max-age=86400"; // 1 day
      
      const search = router.state.location.search as { redirect?: string };
      router.navigate({ to: search.redirect || "/greyfog" });
    } else {
      setError("Invalid credentials. Access denied.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-mono text-foreground">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10 relative"
      >
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-primary to-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_var(--color-primary)] mb-6">
              <Lock className="h-8 w-8 text-black" />
            </div>
            <h1 className="font-display text-3xl font-black text-white tracking-tighter">GREYFOG</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mt-2">Restricted Access</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-500 text-xs text-center border border-red-500/20 bg-red-500/10 rounded-md py-2"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Button Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
              
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  INITIALIZE SESSION
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
