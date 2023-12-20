// 클라이언트 함수
export interface IVideoInfoToCookie {
  channelTitle: string
  videoId: string
  channelId: string
  title: string
  thumbnailsUrl: string
}

// 쿠키 유효기간 1일로 설정
const setExpiration = () => {
  const date = new Date()
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)

  return date.toUTCString()
}

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
  const detailVideoInfo = JSON.stringify(item)
  document.cookie = `detail-video-info=${detailVideoInfo};expires=${setExpiration()};path=/detail;`
}

const setSearchKeywordToCookie = (keyword: string) => {
  const searchKeyword = encodeURIComponent(keyword)
  document.cookie = `search-keyword=${searchKeyword};expires=${setExpiration()};path=/search;`
}

export { setVideoInfoToCookie, setSearchKeywordToCookie }
