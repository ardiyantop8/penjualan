import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSessionStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (payload) => set({ user: payload }),
            clearUser: () => set({ user: null })
        }),
        {
            name: 'session-storage'
        }
    )
)

export default useSessionStore