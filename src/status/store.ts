import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IVideoDetailInfo } from '@/type/Component'

interface Store {
  isDark: boolean
  isApiQuotaExhausted: boolean
  videoDetailInfo: IVideoDetailInfo
  time: number
  toggleDarkMode: (state: boolean) => void
  setQuotaExhausted: () => void
  setVideoDetailInfo: (state: IVideoDetailInfo) => void
  removeVideoDetailInfo: () => void
  setTime: (state: number) => void
  removeTime: () => void
}

const VideoInitialState: IVideoDetailInfo = {
  channelId: '',
  title: '',
  channelTitle: '',
  thumbnailUrl: '',
  currentVideoId: '',
}

const useStore = create<Store>()(
  persist(
    set => ({
      isDark: false,
      isApiQuotaExhausted: false,
      videoDetailInfo: VideoInitialState,
      time: 0,

      toggleDarkMode: state => set({ isDark: state }),
      setQuotaExhausted: () => set({ isApiQuotaExhausted: true }),
      setVideoDetailInfo: state => set({ videoDetailInfo: state }),
      removeVideoDetailInfo: () => {
        set({ videoDetailInfo: VideoInitialState })
      },
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
