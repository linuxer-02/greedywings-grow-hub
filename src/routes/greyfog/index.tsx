import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Users, Eye, ImageIcon, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/greyfog/")({
  component: DashboardPage,
});

function StatCard({ title, value, change, icon: Icon, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <span className="font-display text-4xl font-black text-white">{value}</span>
        <span className="mb-1 flex items-center text-xs font-bold text-emerald-400">
          <ArrowUpRight className="mr-1 h-3 w-3" />
          {change}
        </span>
      </div>
      {/* Glow effect */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
    </motion.div>
  );
}

function DashboardPage() {
  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl">
          Overview
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back to the command center. Here's what's happening.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value="24" change="12%" icon={ImageIcon} delay={0.1} />
        <StatCard title="New Leads" value="156" change="8.2%" icon={Users} delay={0.2} />
        <StatCard title="Profile Views" value="12.4k" change="24%" icon={Eye} delay={0.3} />
        <StatCard title="System Health" value="100%" change="Stable" icon={Activity} delay={0.4} />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-1 lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-white">Recent Activity</h2>
            <button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "New Lead: John Doe", time: "2 hours ago", type: "lead" },
              { title: "Project 'Momentum' updated", time: "5 hours ago", type: "project" },
              { title: "System backup completed", time: "1 day ago", type: "system" },
              { title: "New Lead: Sarah Connor", time: "1 day ago", type: "lead" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  activity.type === 'lead' ? 'bg-violet-500/20 text-violet-400' :
                  activity.type === 'project' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {activity.type === 'lead' ? <Users size={16} /> : activity.type === 'project' ? <ImageIcon size={16} /> : <Activity size={16} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{activity.title}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-primary/10 to-black/40 p-6 backdrop-blur-md"
        >
          <h2 className="mb-6 font-display text-lg font-bold text-white">Quick Actions</h2>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-lg bg-primary px-4 py-3 text-sm font-bold text-black transition-all hover:bg-primary/90">
              Add New Project
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/10">
              View All Leads
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/10">
              Database Settings
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
