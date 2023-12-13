import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  isLogin: boolean
  toggleDarkMode: (state: boolean) => void
  toggleLogin: (state: boolean) => void
  setQuotaExhausted: () => void
}

const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      isLogin: false,
      toggleDarkMode: state => set({ isDark: state }),
      toggleLogin: state => set({ isLogin: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useStore
