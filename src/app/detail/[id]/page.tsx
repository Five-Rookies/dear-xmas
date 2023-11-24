import { IVideo } from '@/type/Api'
import RelatedVedio from '@/app/detail/[id]/RelatedVedio'
import youtubeApiRequest from '@/utils/apiRequest/youtubeApiRequest'
import testJSON from '@public/videos/popular.json'
import styles from './detail.module.scss'
import DetailHeader from './DetailHeader'
import Comments from './Comments'

const getVideoList = async (getVideoId: string) => {
  const response = await youtubeApiRequest()
  return response.find((channel: IVideo) => channel.id === getVideoId)
}

const Detail = async (props: any) => {
  const getVideoId = props.params.id
  if (!getVideoId) return null
  // const getItemInfo = await getVideoList(getVideoId)
  const getItemInfo = testJSON.items[0]
  // const tagStr = getItemInfo.snippet.tags.forEach((tag) => {
  return (
    <div className={`inner-box ${styles.detail}`}>
      <DetailHeader title={getItemInfo.snippet.channelTitle} />
      <h1 className={styles.videoInfoTitle}>{getItemInfo.snippet.title}</h1>
      {getItemInfo ? (
        <div className={styles.visualContainer}>
          <div>
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
              <p
                dangerouslySetInnerHTML={{
                  __html: getItemInfo.snippet.description.replace(
                    /\n/g,
                    '<br/>',
                  ),
                }}
              />
              <p></p>
            </div>
            <Comments />
          </div>
          <RelatedVedio channelId={getItemInfo?.snippet?.channelId} />
        </div>
      ) : (
        <div>상세정보 불러오기 실패 🥲</div>
      )}
    </div>
  )
}

export default Detail
