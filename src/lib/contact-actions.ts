import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const url = process.env.GOOGLE_SHEETS_URL;
    
    if (!url) {
      console.error("GOOGLE_SHEETS_URL is not defined");
      throw new Error("Server configuration error");
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
      
      if (result.status !== "success") {
        throw new Error(result.message || "Failed to save data");
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      throw new Error("Failed to submit form. Please try again later.");
    }
  });
