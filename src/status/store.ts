import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  toggleDarkMode: (state: boolean) => void
  setQuotaExhausted: () => void
}
const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      toggleDarkMode: (state: boolean) => set({ isDark: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
// sessionStorage.removeItem('dark-mode-storage')
export default useStore
