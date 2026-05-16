import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { getAdminSession, logoutAdmin } from "@/lib/auth-actions";
import { LogOut, LayoutDashboard, Briefcase, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-hq")({
  beforeLoad: async ({ location }) => {
    // Only check session on server or if not on login page
    if (location.pathname !== "/admin-hq/login") {
      const user = await getAdminSession();
      if (!user) {
        throw redirect({
          to: "/admin-hq/login",
          search: {
            redirect: location.pathname,
          },
        });
      }
      return { user };
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  async function handleLogout() {
    await logoutAdmin();
    toast.success("Logged out successfully");
    navigate({ to: "/admin-hq/login" });
  }

  if (!user && pathname === "/admin-hq/login") {
    return <Outlet />;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin-hq", icon: LayoutDashboard },
    { label: "Studio Manager", href: "/admin-hq/studio", icon: Briefcase },
    { label: "CRM / Leads", href: "/admin-hq/crm", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-black text-xl">
              G
            </div>
            <span className="font-display text-lg font-black tracking-tight">Admin HQ</span>
          </div>

          <nav className="mt-12 flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_var(--color-primary)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2">
             <a
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
            >
              <Home className="h-4 w-4" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
