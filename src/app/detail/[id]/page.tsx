import axios from 'axios'
import { IVideo } from '@/type/Api'
import RelatedVedio from '@/app/detail/[id]/RelatedVedio'
import styles from './detail.module.scss'

const getVideoList = async (getVideoId: string) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=32&key=${ACCESS_KEY}`
  const response = await (await axios.get(URL)).data.items
  if (!response) {
    throw new Error('data is not defined')
  }

  return response.find((channel: IVideo) => channel.id === getVideoId)
}

const Detail = async (props: any) => {
  const getVideoId = props.params.id
  if (!getVideoId) return null
  const getItemInfo = await getVideoList(getVideoId)

  return (
    <>
      {getItemInfo ? (
        <>
          <figure className={styles.visual}>
            <iframe
              src={`https://www.youtube.com/embed/${getVideoId}`}
              width="100%"
              height="100%"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </figure>

          <div className={styles.videoInfo}>
            <div>
              <figure className={styles.videoInfoImgFrame}>
                <img
                  className={styles.videoInfoImg}
                  src={getItemInfo.snippet.thumbnails.high.url}
                  alt={getItemInfo.snippet.title}
                />
              </figure>
            </div>
            <div className={styles.videoInfoTitleWrap}>
              <h2 className={styles.videoInfoTitle}>
                {getItemInfo.snippet.title}
              </h2>
              <span>{getItemInfo.snippet.channelTitle}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: getItemInfo.snippet.description.replace(
                    /\n/g,
                    '<br/>',
                  ),
                }}
              ></span>
            </div>
          </div>
        </>
      ) : (
        <div>상세정보 불러오기 실패 🥲</div>
      )}
      <RelatedVedio channelId={getItemInfo?.snippet?.channelId} />
    </>
  )
}

export default Detail
