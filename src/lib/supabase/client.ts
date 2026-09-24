import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rxotyaatnwgggjzkbwff.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4b3R5YWF0bndnZ2dqemtid2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzEzNDQsImV4cCI6MjEwNTgwNzM0NH0.4jlq2DuhORPbgmLZLuB-Kqs83hDQU3Pmb1JgHsypoiw';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

export const supabase = createClient();
