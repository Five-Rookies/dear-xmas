import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IYoutubeItem } from '@/type/YoutubeApiResponse'
import youtubeApiRequest from '@/utils/youtubRequest/youtubeApiRequest'
import useScrollBottom from './useScrollBottom'

interface IParameter {
  pageToken: string
  initialData: IYoutubeItem[] | []
  optionalQuery?: { [info: string]: string }
}
const useInfiniteScroll = ({
  pageToken,
  initialData,
  optionalQuery,
}: IParameter): IYoutubeItem[] | [] => {
  const router = useRouter()
  const isBottom: boolean = useScrollBottom(100)
  const currentPageToken = useRef<string>(pageToken)
  const [currentData, setCurrentData] = useState<IYoutubeItem[] | []>(
    initialData,
  )

  const fetchMoreData = async () => {
    const { nextPageToken, items } = await youtubeApiRequest({
      pageToken: currentPageToken.current,
      ...optionalQuery,
    })

    currentPageToken.current = nextPageToken
    setCurrentData(prevCurrentData => {
      return [...prevCurrentData, ...items]
    })
  }

  useEffect(() => {
    if (pageToken && isBottom) {
      fetchMoreData().catch(error => {
        console.error(error)
        alert('[ERROR] 오류가 발생했습니다. 데이터를 다시 조회합니다.')
        router.refresh()
      })
    }
  }, [isBottom])

  return currentData
}

export default useInfiniteScroll
