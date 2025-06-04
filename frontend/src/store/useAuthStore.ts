import { create } from "zustand";
import axios from "@/lib/axios";

interface User {
  id: number;
  username: string;
  email: string;
  job?: string;
  mental_health?: number;
  wellness?: number;
  engage?: number;
  location?: string;
  gender?: string;
  age?: number;
  description?: string;
  hobby?: string;
  phone?: string;
  profile_pic?: string;
  tags?: string;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/users/me/");
      set({ user: res.data });
    } catch {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
}));
