import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables
// Note: In TanStack Start (Vite), env vars are prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Expected Database Schema:
 * 
 * Table: `projects`
 * - `id` (uuid, primary key)
 * - `title` (text)
 * - `client` (text)
 * - `category` (text) - e.g., 'WEB DEV', 'VIDEO', 'SEO', 'SOFTWARE'
 * - `type` (text) - e.g., 'image', 'video'
 * - `mediaUrl` (text) - URL to the image or video
 * - `status` (text) - 'Draft' or 'Published'
 * - `created_at` (timestamp)
 * 
 * Table: `leads`
 * - `id` (uuid, primary key)
 * - `name` (text)
 * - `email` (text)
 * - `company` (text)
 * - `phone` (text)
 * - `budget` (text)
 * - `message` (text)
 * - `status` (text) - 'New', 'Contacted', 'Closed'
 * - `created_at` (timestamp)
 */
