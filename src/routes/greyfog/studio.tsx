import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, MoreVertical, ImageIcon, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useProjects, Project } from "@/hooks/useProjects";

export const Route = createFileRoute("/greyfog/studio")({
  component: StudioManagerPage,
});

function StudioManagerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { projects, isLoading, addProject, deleteProject } = useProjects();

  const [newProject, setNewProject] = useState({
    title: "",
    clientName: "",
    description: "",
    category: "web" as Project["category"],
    categoryLabel: "WEB DEV",
    categoryColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    isVideo: false,
    clientLogo: "",
    stats: [
      { value: "0", label: "VIEWS" }
    ],
    href: "/studio",
    status: "Published",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSave = async () => {
    if (!newProject.title || !newProject.clientName) return;
    
    // Auto-generate a client logo from the first letter
    const clientLogo = newProject.clientName.charAt(0).toUpperCase();
    
    await addProject({ ...newProject, clientLogo });
    setIsAddModalOpen(false);
    setNewProject(prev => ({ ...prev, title: "", clientName: "", description: "" }));
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl space-y-8 relative">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl">
            Studio Manager
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Manage your portfolio projects. Upload new case studies, edit existing ones, and rearrange your showcase.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setIsAddModalOpen(true)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-3 font-bold text-black shadow-[0_0_20px_var(--color-primary)] transition-all hover:scale-105 hover:bg-primary/90"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
          <Plus className="h-5 w-5" />
          Add New Project
        </motion.button>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-md"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">Filter</button>
          <button className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">Sort</button>
        </div>
      </motion.div>

      {/* Projects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="border-b border-white/10 bg-white/5 text-xs uppercase text-white">
              <tr>
                <th className="px-6 py-4 font-mono">Project</th>
                <th className="px-6 py-4 font-mono">Client</th>
                <th className="px-6 py-4 font-mono">Category</th>
                <th className="px-6 py-4 font-mono">Status</th>
                <th className="px-6 py-4 font-mono">Date</th>
                <th className="px-6 py-4 text-right font-mono">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">Loading projects...</td></tr>
              ) : filteredProjects.map((project) => (
                <tr key={project.id} className="transition-colors hover:bg-white/5 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        {project.isVideo ? <Video size={18} /> : <ImageIcon size={18} />}
                      </div>
                      <span className="font-semibold text-white">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.clientName}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
                      {project.categoryLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${project.status === 'Published' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {project.status || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{project.date || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Project Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="mb-6 font-display text-2xl font-bold text-white">Create New Project</h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project Title</label>
                    <input 
                      type="text" 
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none" 
                      placeholder="e.g. Acme Rebrand" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client Name</label>
                    <input 
                      type="text" 
                      value={newProject.clientName}
                      onChange={e => setNewProject({...newProject, clientName: e.target.value})}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none" 
                      placeholder="Acme Corp" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
                  <textarea 
                    rows={3} 
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none resize-none" 
                    placeholder="Brief project description..."
                  />
                </div>

                {/* Upload Area */}
                <div className="mt-4 rounded-xl border-2 border-dashed border-white/10 bg-white/5 p-10 text-center transition-colors hover:border-primary/50 hover:bg-white/10 cursor-pointer group">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white group-hover:bg-primary group-hover:text-black transition-colors">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">Upload Media</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Drag and drop or click to select files (Images/Video)</p>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-5">
                  <button onClick={() => setIsAddModalOpen(false)} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5">Cancel</button>
                  <button onClick={handleSave} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-black hover:bg-primary/90">Save Project</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
