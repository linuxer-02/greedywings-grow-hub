import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Closed';
  date: string;
  budget: string;
}

const MOCK_LEADS: Lead[] = [
  { id: "1", name: "John Doe", company: "Acme Corp", email: "john@acme.com", phone: "+1 234 567 8900", status: "New", date: "Today, 10:30 AM", budget: "$10k - $25k" },
  { id: "2", name: "Sarah Connor", company: "TechFlow", email: "sarah@techflow.io", phone: "+1 987 654 3210", status: "Contacted", date: "Yesterday", budget: "$50k+" },
  { id: "3", name: "Mike Ross", company: "Pearson Specter", email: "mike@pearson.law", phone: "+1 555 123 4567", status: "Closed", date: "Oct 12, 2023", budget: "$25k - $50k" },
];

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    setIsLoading(true);
    
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setLeads(MOCK_LEADS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setLeads(data as any);
      } else {
        setLeads(MOCK_LEADS);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setLeads(MOCK_LEADS);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    // Optimistic update
    const previousLeads = [...leads];
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating lead:', err);
      // Revert
      setLeads(previousLeads);
    }
  };

  const deleteLead = async (id: string) => {
    // Optimistic update
    const previousLeads = [...leads];
    setLeads(prev => prev.filter(l => l.id !== id));

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting lead:', err);
      // Revert
      setLeads(previousLeads);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, isLoading, refetch: fetchLeads, updateLeadStatus, deleteLead };
}
