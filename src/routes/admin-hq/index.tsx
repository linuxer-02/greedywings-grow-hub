import { createFileRoute } from "@tanstack/react-router";
import { getLeads } from "@/lib/crm-actions";
import { getStudioProjects } from "@/lib/studio-actions";
import { Users, Briefcase, TrendingUp, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/admin-hq/")({
  component: DashboardPage,
});

function StatCard({ title, value, icon: Icon, description, trend }: any) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:border-primary/50 hover:bg-white/[0.05]">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            {title}
          </p>
          <h3 className="mt-2 font-display text-4xl font-black text-white">{value}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest">
        <span className="text-primary">{trend}</span>
        <span className="text-muted-foreground/40">{description}</span>
      </div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function DashboardPage() {
  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => getLeads(),
  });

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getStudioProjects(),
  });

  const newLeads = (leadsQuery.data || []).filter((l: any) => l.status === "NEW").length;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-4xl font-black tracking-tight text-white">
          Overview<span className="text-primary">.</span>
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
          Pulse of your business activities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={leadsQuery.data?.length || 0}
          icon={Users}
          trend="+12%"
          description="v/s last month"
        />
        <StatCard
          title="New Inquiries"
          value={newLeads}
          icon={Clock}
          trend="Action Required"
          description={`${newLeads} leads waiting`}
        />
        <StatCard
          title="Active Projects"
          value={projectsQuery.data?.length || 0}
          icon={Briefcase}
          trend="Stable"
          description="Portfolio count"
        />
        <StatCard
          title="Conversion Rate"
          value="24%"
          icon={TrendingUp}
          trend="+4.5%"
          description="Avg. project win"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
         {/* Recent Leads Preview */}
         <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
            <h3 className="font-display text-xl font-bold text-white">Recent Inquiries</h3>
            <div className="mt-6 space-y-4">
              {(leadsQuery.data || []).slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-sans text-sm font-bold text-white">{lead.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">{lead.service}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                    lead.status === 'NEW' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
              {(leadsQuery.data || []).length === 0 && (
                <p className="text-center font-mono text-xs text-muted-foreground/40 py-10">No leads yet.</p>
              )}
            </div>
         </div>

         {/* Studio Preview */}
         <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
            <h3 className="font-display text-xl font-bold text-white">Studio Snapshot</h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
               {(projectsQuery.data || []).slice(0, 4).map((project: any) => (
                 <div key={project.id} className="relative aspect-video rounded-xl overflow-hidden border border-white/5">
                    <img src={project.image} className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                      <p className="font-sans text-[10px] font-bold text-white truncate">{project.title}</p>
                    </div>
                 </div>
               ))}
               {(projectsQuery.data || []).length === 0 && (
                <div className="col-span-2 text-center font-mono text-xs text-muted-foreground/40 py-10">No projects added.</div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
}
