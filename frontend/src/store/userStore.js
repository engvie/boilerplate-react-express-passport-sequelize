import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (!user) {
      return;
    }

    set({
      user: user,
      isAuthenticated: true,
    })
  },

  removeUser: () => set(() => ({
    user: null,
    isAuthenticated: false,
  })),
}));
