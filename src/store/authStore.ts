/**
 * Auth Store - Zustand
 * Mock authentication state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USERS } from '@/src/data/mock/users.mock';

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

// Mock passwords for existing users (for testing only)
const MOCK_PASSWORDS: Record<string, string> = {
  'somchai@example.com': 'password123',
  'sarah.johnson@example.com': 'password123',
  'admin@triply.com': 'admin123',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user in mock database
        const foundUser = USERS.find(u => u.email === email);
        const correctPassword = MOCK_PASSWORDS[email];

        if (foundUser && password === correctPassword) {
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
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if email already exists
        const existingUser = USERS.find(u => u.email === email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }

        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          displayName,
          avatarUrl: '/avatars/default.jpg',
        };

        // Add password to mock passwords (in real app, this would be API call)
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
