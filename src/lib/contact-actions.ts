import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "./supabase";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  service: z.string(),
  message: z.string(),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    // 1. Save to Supabase (CRM)
    const { error: supabaseError } = await supabase
      .from("leads")
      .insert([
        {
          ...data,
          status: "NEW",
        },
      ]);

    if (supabaseError) {
      console.error("Error saving lead to Supabase:", supabaseError);
      // We don't throw here yet, as we still want to try Google Sheets
    }

    // 2. Save to Google Sheets (Backup)
    const url = process.env.GOOGLE_SHEETS_URL;
    
    if (!url) {
      console.error("GOOGLE_SHEETS_URL is not defined");
      if (supabaseError) throw new Error("Server configuration error");
      return { success: true }; // If Supabase succeeded, we still call it a win
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.status !== "success" && supabaseError) {
        throw new Error(result.message || "Failed to save data");
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      if (supabaseError) {
        throw new Error("Failed to submit form. Please try again later.");
      }
      return { success: true };
    }
  });
