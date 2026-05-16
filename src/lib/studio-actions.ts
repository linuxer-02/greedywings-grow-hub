import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin, supabase } from "./supabase";
import { ensureAdmin } from "./auth-actions";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(["web", "video", "seo", "software"]),
  categoryLabel: z.string(),
  categoryColor: z.string(),
  image: z.string(),
  isVideo: z.boolean(),
  clientLogo: z.string(),
  clientName: z.string(),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string()
  })),
  href: z.string(),
});

export const getStudioProjects = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("studio_projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
    return data;
  });

export const createStudioProject = createServerFn({ method: "POST" })
  .inputValidator(projectSchema)
  .handler(async ({ data }) => {
    await ensureAdmin();

    const { error } = await supabaseAdmin
      .from("studio_projects")
      .insert([data]);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateStudioProject = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    project: projectSchema
  }))
  .handler(async ({ data }) => {
    await ensureAdmin();

    const { error } = await supabaseAdmin
      .from("studio_projects")
      .update(data.project)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteStudioProject = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await ensureAdmin();

    const { error } = await supabaseAdmin
      .from("studio_projects")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
