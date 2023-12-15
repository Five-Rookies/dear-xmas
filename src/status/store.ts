import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  videoThumbnailUrl: string
  time: number
  isLogin: boolean
  toggleDarkMode: (state: boolean) => void
  setQuotaExhausted: () => void
  setThumbnailUrl: (state: string | undefined) => void
  setTime: (state: number) => void
  removeThumbnailUrl: () => void
  removeTime: () => void
  toggleLogin: (state: boolean) => void
}

const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      videoThumbnailUrl: '',
      time: 0,
      isLogin: false,
      toggleDarkMode: state => set({ isDark: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
      setThumbnailUrl: state => set({ videoThumbnailUrl: state }),
      setTime: state => set({ time: state }),
      removeThumbnailUrl: () => {
        sessionStorage.removeItem('videoThumbnailUrl')
        set({ videoThumbnailUrl: '' })
      },
      removeTime: () => {
        sessionStorage.removeItem('time')
        set({ time: 0 })
      },
      toggleLogin: state => set({ isLogin: state }),
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useStore
