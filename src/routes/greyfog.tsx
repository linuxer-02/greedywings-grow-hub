import { Outlet, createFileRoute, redirect, useRouter, Link } from "@tanstack/react-router";
import { LayoutDashboard, Image as ImageIcon, Users, Settings, LogOut, Code, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// Extremely simple auth check for MVP
function isAuthenticated() {
  if (typeof document !== "undefined") {
    return document.cookie.includes("admin_session=true");
  }
  return false;
}

export const Route = createFileRoute("/greyfog")({
  beforeLoad: ({ location }) => {
    // Only enforce redirect on the client side for this simple MVP auth
    if (typeof document !== "undefined") {
      if (!isAuthenticated() && location.pathname !== "/greyfog/login") {
        throw redirect({
          to: "/greyfog/login",
          search: {
            redirect: location.pathname,
          },
        });
      }
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const isLoginPage = router.state.location.pathname === "/greyfog/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If we are on the login page, don't show the sidebar
  if (isLoginPage) {
    return <Outlet />;
  }

  const handleLogout = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/greyfog/login";
  };

  const navItems = [
    { name: "Dashboard", href: "/greyfog", icon: LayoutDashboard },
    { name: "Studio Manager", href: "/greyfog/studio", icon: ImageIcon },
    { name: "Leads CRM", href: "/greyfog/leads", icon: Users },
    { name: "Settings", href: "/greyfog/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-foreground font-mono selection:bg-primary/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <Code className="h-5 w-5 text-black" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">GREYFOG</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="hidden lg:flex h-20 items-center gap-3 border-b border-white/5 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_var(--color-primary)]">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-tighter">GREYFOG</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">Admin Portal</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4 mt-16 lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.state.location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-primary drop-shadow-[0_0_8px_var(--color-primary)]" : ""
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="border-t border-white/5 p-4">
            <div className="mb-4 flex items-center gap-3 px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted border border-white/10">
                <span className="font-display font-black text-white">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Ashdeep</span>
                <span className="text-[10px] uppercase tracking-wider text-primary">Superadmin</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500/80 transition-all hover:bg-red-500/10 hover:text-red-500"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden pt-16 lg:pt-0 relative">
         {/* Background abstract gradients */}
         <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
         <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/10 blur-[120px]" />
         
        <div className="flex-1 p-6 lg:p-10 z-10 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
