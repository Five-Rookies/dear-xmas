interface IVideoInfoToCookie {
  channelTitle: string
  videoId: string
  channelId: string
  title: string
  thumbnailsUrl: string
}

// 클라이언트 함수
const setVideoInfoToCookie = ({
  channelTitle,
  videoId,
  channelId,
  title,
  thumbnailsUrl,
}: IVideoInfoToCookie) => {
  const item = {
    channelTitle: encodeURIComponent(channelTitle),
    videoId,
    channelId,
    title: encodeURIComponent(title),
    thumbnailsUrl,
  }
  const date = new Date()
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)
  document.cookie = `detail-video-info=${JSON.stringify(
    item,
  )};expires=${date.toUTCString()};path=/detail;`
}

// 클라이언트 함수
const deleteVideoInfoToCookie = () => {
  document.cookie = `detail-video-info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/detail;`
}

export { setVideoInfoToCookie, deleteVideoInfoToCookie }
