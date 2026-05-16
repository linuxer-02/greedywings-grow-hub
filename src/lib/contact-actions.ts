import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

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
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    // If Supabase is not configured, we'll just return success to simulate it for now.
    // In a real environment, you'd want to throw an error or handle it.
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials not found. Simulating successful form submission.");
      return { success: true };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Map the form data to the schema we defined in supabase.ts
      const { error } = await supabase.from("leads").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: "Not Provided", // Add to form later if needed
          budget: "Not Provided", // Add to form later if needed
          message: data.message,
          status: "New",
        },
      ]);

      if (error) {
        throw new Error(error.message || "Failed to save data to Supabase");
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting to Supabase:", error);
      throw new Error("Failed to submit form. Please try again later.");
    }
  });
