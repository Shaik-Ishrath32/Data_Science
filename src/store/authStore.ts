import { create } from 'zustand';
import type { User } from '../types';
import { supabase, getCurrentUser } from '../lib/supabase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  
  setUser: (user) => set({ user, loading: false }),
  
  initialize: async () => {
    try {
      // Skip Supabase check if credentials are missing
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase credentials not configured - running in demo mode');
        set({ user: null, loading: false, initialized: true });
        return;
      }

      const { user: authUser } = await getCurrentUser();
      
      if (authUser) {
        // Fetch user profile from database
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', authUser.id)
          .single();
        
        if (error) {
          console.error('Error fetching user profile:', error);
          set({ user: null, loading: false, initialized: true });
          return;
        }
        
        set({ user: userProfile, loading: false, initialized: true });
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, loading: false, initialized: true });
    }
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Set up auth state listener
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Fetch user profile
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single();
      
      if (userProfile) {
        useAuthStore.getState().setUser(userProfile);
      }
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.getState().setUser(null);
    }
  });
}
