import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  category: "all" | "web" | "video" | "seo" | "software";
  categoryLabel: string;
  categoryColor: string;
  image: string;
  isVideo: boolean;
  clientLogo: string;
  clientName: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  href: string;
  status?: string;
  date?: string;
}

// Fallback Mock Data
const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    category: "web",
    categoryLabel: "WEB DEV",
    categoryColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    isVideo: false,
    clientLogo: "N",
    clientName: "Nutrazs",
    title: "E-commerce Platform Redesign",
    description: "Complete UX overhaul for B2B SaaS platform serving 10k+ users daily.",
    stats: [
      { value: "+187%", label: "CONVERSION" },
      { value: "-42%", label: "BOUNCE RATE" },
      { value: "3.2s", label: "LOAD TIME" },
    ],
    href: "/studio",
    status: "Published",
    date: "2023-10-12",
  },
  {
    id: "p2",
    category: "video",
    categoryLabel: "VIDEO",
    categoryColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    isVideo: true,
    clientLogo: "M",
    clientName: "Momentum Studios",
    title: "Brand Storytelling Series",
    description: "12-part documentary series showcasing startup journey and culture.",
    stats: [
      { value: "2.4M", label: "VIEWS" },
      { value: "+320%", label: "ENGAGEMENT" },
      { value: "12", label: "EPISODES" },
    ],
    href: "/studio",
    status: "Draft",
    date: "2023-11-05",
  },
  {
    id: "p3",
    category: "seo",
    categoryLabel: "SEO",
    categoryColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
    isVideo: false,
    clientLogo: "G",
    clientName: "GrowthLab",
    title: "Organic Traffic Domination",
    description: "SEO strategy overhaul for fintech startup targeting enterprise clients.",
    stats: [
      { value: "+412%", label: "TRAFFIC" },
      { value: "#1", label: "RANKINGS" },
      { value: "87", label: "KEYWORDS" },
    ],
    href: "/studio",
    status: "Published",
    date: "2024-01-20",
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSupabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const fetchProjects = async () => {
    setIsLoading(true);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured. Using mock projects.");
      setProjects(MOCK_PROJECTS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: sbError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      
      if (data && data.length > 0) {
        setProjects(data as any);
      } else {
        setProjects(MOCK_PROJECTS); 
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      setProjects(MOCK_PROJECTS); 
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const projectWithId = { ...newProject, id: tempId } as Project;
    setProjects(prev => [projectWithId, ...prev]);

    if (!isSupabaseConfigured) return; // Fallback to memory

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();

      if (error) throw error;

      if (data) {
        setProjects(prev => prev.map(p => p.id === tempId ? data[0] : p));
      }
    } catch (err) {
      console.error('Error adding project:', err);
      // Revert optimistic update
      setProjects(prev => prev.filter(p => p.id !== tempId));
    }
  };

  const deleteProject = async (id: string) => {
    // Optimistic update
    const previousProjects = [...projects];
    setProjects(prev => prev.filter(p => p.id !== id));

    if (!isSupabaseConfigured) return; // Fallback to memory

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting project:', err);
      // Revert
      setProjects(previousProjects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, error, refetch: fetchProjects, addProject, deleteProject };
}
