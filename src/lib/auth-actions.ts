import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const SESSION_COOKIE_NAME = "greedy_admin_session";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ashdeep";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Ashdeep@9842";

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    username: z.string(),
    password: z.string(),
  }))
  .handler(async ({ data }) => {
    if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
      // In a real app, you'd use a JWT or a session ID stored in DB.
      // For this specific requirement, we'll use a simple signed-like token.
      const sessionToken = btoa(JSON.stringify({ user: ADMIN_USERNAME, expires: Date.now() + 24 * 60 * 60 * 1000 }));
      
      setCookie(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return { success: true };
    }

    throw new Error("Invalid credentials");
  });

export const logoutAdmin = createServerFn({ method: "POST" })
  .handler(async () => {
    deleteCookie(SESSION_COOKIE_NAME);
    return { success: true };
  });

export const getAdminSession = createServerFn({ method: "GET" })
  .handler(async () => {
    const session = getCookie(SESSION_COOKIE_NAME);
    if (!session) return null;

    try {
      const payload = JSON.parse(atob(session));
      if (payload.expires < Date.now()) {
        deleteCookie(SESSION_COOKIE_NAME);
        return null;
      }
      return payload.user;
    } catch {
      return null;
    }
  });

export async function ensureAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
