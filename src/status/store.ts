import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  toggleDarkMode: (state: boolean) => void
}
const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      toggleDarkMode: (state: boolean) => set({ isDark: state }),
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
//sessionStorage.removeItem('dark-mode-storage')
export default useStore
