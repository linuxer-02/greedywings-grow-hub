import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "./supabase";
import { ensureAdmin } from "./auth-actions";
import { z } from "zod";

export const getLeads = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureAdmin();
    
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"]),
  }))
  .handler(async ({ data }) => {
    await ensureAdmin();

    const { error } = await supabaseAdmin
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const addLeadNote = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    notes: z.string(),
  }))
  .handler(async ({ data }) => {
    await ensureAdmin();

    const { error } = await supabaseAdmin
      .from("leads")
      .update({ notes: data.notes })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
