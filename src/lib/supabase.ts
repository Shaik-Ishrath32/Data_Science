import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

const hasCredentials = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!hasCredentials) {
  console.warn('⚠️ Running in DEMO MODE - Supabase not configured. Authentication disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: hasCredentials,
    persistSession: hasCredentials,
    detectSessionInUrl: hasCredentials,
  },
});

// Auth helpers
export const signIn = async (email: string, password: string) => {
  if (!hasCredentials) {
    return { data: null, error: new Error('Demo mode - authentication disabled') };
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!hasCredentials) return { error: null };
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
  if (!hasCredentials) {
    return { data: null, error: new Error('Demo mode - authentication disabled') };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  if (!hasCredentials) return { user: null, error: null };
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  if (!hasCredentials) return { session: null, error: null };
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const resetPassword = async (email: string) => {
  if (!hasCredentials) {
    return { data: null, error: new Error('Demo mode - authentication disabled') };
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword: string) => {
  if (!hasCredentials) {
    return { data: null, error: new Error('Demo mode - authentication disabled') };
  }
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};
