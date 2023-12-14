import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  videoThumbnailUrl: string
  toggleDarkMode: (state: boolean) => void
  setQuotaExhausted: () => void
  setThumbnailUrl: (state: string | undefined) => void
  removeThumbnailUrl: () => void
}

const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      videoThumbnailUrl: '',
      toggleDarkMode: state => set({ isDark: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
      setThumbnailUrl: state => set({ videoThumbnailUrl: state }),
      removeThumbnailUrl: () => {
        sessionStorage.removeItem('videoThumbnailUrl')
        set({ videoThumbnailUrl: '' })
      },
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
// sessionStorage.removeItem('dark-mode-storage')
export default useStore
