import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: {
    id: string
    username: string
  } | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        // TODO: 实际调用登录 API
        // 这里模拟登录
        if (username && password) {
          set({
            token: 'mock-token',
            user: { id: '1', username },
            isAuthenticated: true,
          })
        } else {
          throw new Error('Invalid credentials')
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)


