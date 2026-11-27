import type { AuthUser } from '@/types/auth.type';
import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  user: AuthUser | null;
  updateAuth: (accessToken: string | null, user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  updateAuth: (accessToken, user) =>
    set({
      accessToken,
      user,
    }),
}));
