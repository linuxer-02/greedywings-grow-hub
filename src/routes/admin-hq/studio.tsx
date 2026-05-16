import { createFileRoute } from "@tanstack/react-router";
import { getStudioProjects, createStudioProject, updateStudioProject, deleteStudioProject } from "@/lib/studio-actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ExternalLink, 
  Image as ImageIcon, 
  Video, 
  BarChart3, 
  X,
  Loader2,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-hq/studio")({
  component: StudioManagerPage,
});

const EMPTY_PROJECT = {
  title: "",
  description: "",
  category: "web",
  categoryLabel: "WEB DEV",
  categoryColor: "bg-primary",
  image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  isVideo: false,
  clientLogo: "G",
  clientName: "",
  stats: [
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
  ],
  href: "/studio",
};

function ProjectEditor({ project, onSave, onCancel, isSaving }: any) {
  const [form, setForm] = useState(project || EMPTY_PROJECT);

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onCancel} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-neutral-900/80 backdrop-blur-md p-6">
          <h3 className="font-display text-2xl font-black text-white">
            {project ? 'Edit Project' : 'New Project'}
          </h3>
          <button onClick={onCancel} className="text-muted-foreground hover:text-white transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Basic Info */}
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Project Title</label>
                  <input 
                    value={form.title} 
                    onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-primary transition-all"
                    placeholder="e.g. E-commerce Overhaul"
                  />
               </div>

               <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Description</label>
                  <textarea 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-primary transition-all min-h-[100px]"
                    placeholder="Brief overview of what was achieved..."
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Category</label>
                    <select 
                      value={form.category} 
                      onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="web" className="bg-neutral-900">WEB</option>
                      <option value="video" className="bg-neutral-900">VIDEO</option>
                      <option value="seo" className="bg-neutral-900">SEO</option>
                      <option value="software" className="bg-neutral-900">SOFTWARE</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Is Video?</label>
                    <div className="flex gap-4">
                       <button 
                        type="button"
                        onClick={() => setForm({...form, isVideo: true})}
                        className={`flex-1 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest ${form.isVideo ? 'bg-primary border-primary text-primary-foreground' : 'bg-white/5 border-white/10 text-muted-foreground'}`}
                       >
                        <Video className="h-3 w-3" /> YES
                       </button>
                       <button 
                        type="button"
                        onClick={() => setForm({...form, isVideo: false})}
                        className={`flex-1 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest ${!form.isVideo ? 'bg-primary border-primary text-primary-foreground' : 'bg-white/5 border-white/10 text-muted-foreground'}`}
                       >
                        <ImageIcon className="h-3 w-3" /> NO
                       </button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Visuals & Client */}
            <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Cover Image URL</label>
                  <input 
                    value={form.image} 
                    onChange={e => setForm({...form, image: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-xs text-white focus:outline-none focus:border-primary transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <div className="mt-2 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20">
                     <img src={form.image} className="w-full h-full object-cover" onError={(e: any) => e.target.src='https://placehold.co/600x400/000/FFF?text=Invalid+URL'} />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Client Name</label>
                    <input 
                      value={form.clientName} 
                      onChange={e => setForm({...form, clientName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="Nutrazs"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Client Initial/Logo</label>
                    <input 
                      value={form.clientLogo} 
                      maxLength={1}
                      onChange={e => setForm({...form, clientLogo: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white text-center focus:outline-none focus:border-primary transition-all"
                      placeholder="N"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h4 className="font-display text-lg font-bold text-white">Project Performance Stats</h4>
             </div>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {form.stats.map((stat: any, i: number) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                     <input 
                        value={stat.value}
                        onChange={e => handleStatChange(i, 'value', e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-1 font-display text-2xl font-black text-primary focus:outline-none focus:border-primary transition-all"
                        placeholder="+187%"
                      />
                      <input 
                        value={stat.label}
                        onChange={e => handleStatChange(i, 'label', e.target.value)}
                        className="w-full bg-transparent font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 focus:outline-none focus:text-white transition-all"
                        placeholder="CONVERSION"
                      />
                  </div>
                ))}
             </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
             <button 
                onClick={onCancel}
                className="px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-all"
             >
                Discard
             </button>
             <button 
                disabled={isSaving}
                onClick={() => onSave(form)}
                className="bg-primary text-primary-foreground px-10 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_40px_-10px_var(--color-primary)] flex items-center gap-3 transition-all hover:scale-105 disabled:opacity-50"
             >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save Project</>}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudioManagerPage() {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getStudioProjects(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createStudioProject({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, project }: any) => updateStudioProject({ data: { id, project } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully!");
      setEditingProject(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStudioProject({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted.");
    },
  });

  const handleSave = (data: any) => {
    // Add missing boilerplate fields if not set
    const categoryLabels: any = { web: "WEB DEV", video: "VIDEO", seo: "SEO", software: "SOFTWARE" };
    const categoryColors: any = { web: "bg-primary", video: "bg-violet-500", seo: "bg-emerald-500", software: "bg-blue-500" };
    
    const finalData = {
      ...data,
      categoryLabel: categoryLabels[data.category] || "WORK",
      categoryColor: categoryColors[data.category] || "bg-neutral-500",
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, project: finalData });
    } else {
      createMutation.mutate(finalData);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white">
            Studio Manager<span className="text-primary">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
            Portfolio Showcase CRUD
          </p>
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsQuery.isLoading ? (
           Array.from({length: 6}).map((_, i) => (
            <div key={i} className="aspect-video rounded-3xl bg-white/5 animate-pulse" />
           ))
        ) : (projectsQuery.data || []).map((project: any) => (
          <div key={project.id} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] transition-all hover:border-primary/50">
            <div className="aspect-video overflow-hidden">
               <img src={project.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
               <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] font-bold uppercase tracking-wider text-white ${project.categoryColor}`}>
                    {project.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">{project.clientName}</span>
               </div>
               <h3 className="font-display text-lg font-bold text-white truncate">{project.title}</h3>
               
               <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingProject(project)}
                      className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                       onClick={() => {
                         if(confirm("Are you sure? This cannot be undone.")) {
                            deleteMutation.mutate(project.id);
                         }
                       }}
                       className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a href="/studio" target="_blank" className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-muted-foreground/60 hover:text-primary transition-all">
                    VIEW ON SITE <ExternalLink className="h-3 w-3" />
                  </a>
               </div>
            </div>
          </div>
        ))}

        {(!projectsQuery.isLoading && (projectsQuery.data || []).length === 0) && (
           <div className="col-span-full flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-white/5 bg-white/[0.02]">
              <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/40">Your studio is empty.</p>
           </div>
        )}
      </div>

      {(isAdding || editingProject) && (
        <ProjectEditor 
          project={editingProject} 
          onCancel={() => {
            setIsAdding(false);
            setEditingProject(null);
          }}
          onSave={handleSave}
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
