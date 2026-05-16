import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Mail, Phone, Calendar, MoreVertical, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import { useLeads } from "@/hooks/useLeads";

export const Route = createFileRoute("/greyfog/leads")({
  component: LeadsCRMPage,
});

function LeadsCRMPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { leads, isLoading, updateLeadStatus, deleteLead } = useLeads();

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl space-y-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl">
            Leads CRM
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Track inquiries from your contact page. Manage potential clients and follow-ups.
          </p>
        </motion.div>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-md"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </motion.div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-10 text-center text-sm text-muted-foreground">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="col-span-full py-10 text-center text-sm text-muted-foreground">No leads found.</div>
        ) : filteredLeads.map((lead, i) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-[0_0_30px_-10px_var(--color-primary)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-display text-lg font-black text-white group-hover:bg-primary group-hover:text-black transition-colors">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white">{lead.name}</h3>
                  <span className="text-xs font-medium text-muted-foreground">{lead.company}</span>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                lead.status === 'New' ? 'bg-primary/20 text-primary' :
                lead.status === 'Contacted' ? 'bg-amber-500/20 text-amber-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {lead.status}
              </span>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/5 pt-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-white/40" />
                <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors">{lead.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-white/40" />
                <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">{lead.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-white/40" />
                <span>{lead.date}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Budget</span>
                <span className="font-mono text-sm font-bold text-white">{lead.budget}</span>
              </div>
              
              <div className="flex gap-2">
                {lead.status === 'New' && (
                  <button 
                    onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-black transition-colors" 
                    title="Mark Contacted"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}
                <button 
                  onClick={() => deleteLead(lead.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
