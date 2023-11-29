import { IYoutubeItem } from '@/type/Api'
import RelatedVedio from '@/app/detail/[id]/RelatedVedio'
import youtubeDataRequest from '@/utils/apiRequest/youtubeApiRequest'
import styles from './detail.module.scss'
import DetailHeader from './DetailHeader'
import CommentList from '../../../components/detail/CommentList'

const getVideoList = async (getVideoId: string) => {
  const response = await youtubeDataRequest()
  return response.items.find(
    (channel: IYoutubeItem) => channel.id.videoId === getVideoId,
  )
}

const Detail = async (props: any) => {
  const getVideoId = props.params.id
  if (!getVideoId) return null
  const getItemInfo = await getVideoList(getVideoId)
  if (!getItemInfo) return null

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
                className={styles.videoInfoText}
                dangerouslySetInnerHTML={{
                  __html: getItemInfo.snippet.description.replace(
                    /\n/g,
                    '<br/>',
                  ),
                }}
              />
              <p></p>
            </div>
            <CommentList getVideoId={getVideoId} />
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
