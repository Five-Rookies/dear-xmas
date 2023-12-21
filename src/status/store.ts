import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  time: number
  toggleDarkMode: (state: boolean) => void
  setQuotaExhausted: () => void
  setTime: (state: number) => void
  removeTime: () => void
}

const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      time: 0,

      toggleDarkMode: state => set({ isDark: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
      setTime: state => set({ time: state }),
      removeTime: () => {
        set({ time: 0 })
      },
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useStore
