/**
 * Auth Store - Zustand
 * Mock authentication state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PASSWORDS, getUserByEmail } from '@/src/data/mock/users.mock';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user in mock database using helper function
        const foundUser = getUserByEmail(email);
        const correctPassword = MOCK_PASSWORDS[email];

        if (foundUser && password === correctPassword) {
          // Update last login time
          foundUser.lastLogin = new Date().toISOString();
          
          const user: User = {
            id: foundUser.id,
            email: foundUser.email,
            displayName: foundUser.displayName,
            avatarUrl: foundUser.avatarUrl,
          };
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, displayName: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if email already exists using helper function
        const existingUser = getUserByEmail(email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }

        // Create new user (in real app, this would be saved to database)
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          displayName,
          avatarUrl: '/avatars/default.jpg',
        };

        // Store password in mock passwords map
        MOCK_PASSWORDS[email] = password;

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'triply-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
