import { create } from 'zustand';

interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface AuthStore {
  accessToken: string | null;
  user: AuthUser | null;
  updateAuth: (accessToken: string, user: AuthUser) => void;
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
