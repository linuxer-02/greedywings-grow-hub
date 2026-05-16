import { createFileRoute } from "@tanstack/react-router";
import { getLeads, updateLeadStatus, addLeadNote } from "@/lib/crm-actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Search,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  ExternalLink,
  Users
} from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/admin-hq/crm")({
  component: CrmPage,
});

const STATUS_CONFIG: Record<string, any> = {
  NEW: { label: "NEW", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Clock },
  CONTACTED: { label: "CONTACTED", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: MessageSquare },
  QUALIFIED: { label: "QUALIFIED", color: "text-violet-400 bg-violet-400/10 border-violet-400/20", icon: CheckCircle2 },
  WON: { label: "WON", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
  LOST: { label: "LOST", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
};

function LeadCard({ lead, onUpdateStatus, onUpdateNotes }: any) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");
  const config = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden transition-all hover:border-white/10">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-lg font-bold text-white">{lead.name}</h3>
              <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${config.color}`}>
                <config.icon className="h-3 w-3" />
                {config.label}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {lead.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {lead.phone}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {format(new Date(lead.created_at), 'dd MMM yyyy')}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select 
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground focus:outline-none focus:border-primary transition-all"
            >
              {Object.keys(STATUS_CONFIG).map(s => (
                <option key={s} value={s} className="bg-neutral-900">{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-black/40 p-4 border border-white/5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Service Requested</p>
            <p className="font-sans text-sm font-bold text-white uppercase">{lead.service}</p>
          </div>

          <div className="rounded-xl bg-black/40 p-4 border border-white/5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Inquiry Message</p>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed italic">"{lead.message}"</p>
          </div>

          <div>
             <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Internal Notes</p>
                {!isEditingNotes && (
                   <button onClick={() => setIsEditingNotes(true)} className="text-[10px] font-mono font-bold text-primary hover:underline uppercase tracking-widest">
                     {lead.notes ? 'Edit' : 'Add Note'}
                   </button>
                )}
             </div>
             {isEditingNotes ? (
                <div className="space-y-3">
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 font-sans text-sm text-white focus:outline-none focus:border-primary resize-none"
                    rows={3}
                    placeholder="Add internal project details or follow-up status..."
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingNotes(false)} className="px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white">Cancel</button>
                    <button 
                      onClick={() => {
                        onUpdateNotes(lead.id, notes);
                        setIsEditingNotes(false);
                      }}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
             ) : (
                lead.notes ? (
                  <p className="font-sans text-sm text-muted-foreground/80 bg-white/5 p-4 rounded-xl border border-dashed border-white/10">{lead.notes}</p>
                ) : (
                  <p className="text-[10px] font-mono text-muted-foreground/20 italic uppercase tracking-widest">No internal notes added yet.</p>
                )
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => getLeads(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: any) => updateLeadStatus({ data: { id, status } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead status updated");
    },
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, notes }: any) => addLeadNote({ data: { id, notes } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead notes updated");
    },
  });

  const filteredLeads = (leadsQuery.data || []).filter((l: any) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                         l.email.toLowerCase().includes(search.toLowerCase()) ||
                         l.service.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || l.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white">
            Lead CRM<span className="text-primary">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
            Pipeline Management & Inquiries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
             <input 
               type="text"
               placeholder="Search leads..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-primary transition-all w-64"
             />
           </div>

           <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
             <Filter className="h-3 w-3 text-muted-foreground/60" />
             <select 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="bg-transparent font-mono text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none"
             >
               <option value="all" className="bg-neutral-900">ALL LEADS</option>
               {Object.keys(STATUS_CONFIG).map(s => (
                 <option key={s} value={s} className="bg-neutral-900">{s}</option>
               ))}
             </select>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leadsQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/40 space-y-4">
             <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="font-mono text-xs uppercase tracking-widest">Accessing records...</p>
          </div>
        ) : filteredLeads.length > 0 ? (
          filteredLeads.map((lead: any) => (
            <LeadCard 
              key={lead.id} 
              lead={lead} 
              onUpdateStatus={(id: string, status: string) => updateStatusMutation.mutate({ id, status })}
              onUpdateNotes={(id: string, notes: string) => updateNotesMutation.mutate({ id, notes })}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-white/5 bg-white/[0.02]">
            <Users className="h-12 w-12 text-muted-foreground/20" />
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/40">No leads found in this pipeline.</p>
          </div>
        )}
      </div>
    </div>
  );
}
