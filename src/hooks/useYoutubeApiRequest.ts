'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import useStore from '@/status/store'
import { IYoutubeResponse } from '@/type/Api'

const printErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
  }
}

const youtubeApiRequest = async (
  setQuotaExhausted: () => void,
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const baseURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet`
  const commonQuery = `&regionCode=kr&type=video&order=relevance&videoSyndicated=true&maxResults=${maxResults}`
  const URL = `${baseURL}${commonQuery}${optionalQuery}&key=${ACCESS_KEY}`

  try {
    const youtubeApiData = await axios.get(URL)
    return youtubeApiData.data
  } catch (error) {
    console.log('[NOTICE] Youtube API 요청 불가. JSON 데이터로 대체합니다.')
    printErrorMessage(error)
    setQuotaExhausted()
  }
}

const youtubeJsonRequest = async (
  apiType: string = 'popular',
  optionalQuery: string = '',
) => {
  try {
    let jsonData
    if (apiType === 'popular' || apiType === 'search') {
      jsonData = await import(
        '@public/videos/christmas/christmasPopular_v1.json'
      )
    } else {
      const channelId = optionalQuery.split('=')[1]
      jsonData = await import(
        `@public/videos/christmas/searchByChannels/search-by-channel-id-${channelId}.json`
      )
    }

    return jsonData.default
  } catch (error) {
    console.log('[NOTICE] 유효하지 않은 JSON 데이터 요청입니다.')
    printErrorMessage(error)
  }
}

const useYoutubeDataRequest = (
  apiType: string = 'popular',
  optionalQuery: string = '&q=크리스마스|크리스마스영화',
  maxResults: number = 32,
) => {
  const { isApiQuotaExhausted, setQuotaExhausted } = useStore()
  const [data, setData] = useState<IYoutubeResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      let response
      if (isApiQuotaExhausted) {
        response = await youtubeJsonRequest(apiType, optionalQuery)
      } else {
        try {
          response = await youtubeApiRequest(
            setQuotaExhausted,
            optionalQuery,
            maxResults,
          )
        } catch (error) {
          response = await youtubeJsonRequest(apiType, optionalQuery)
        }
      }
      setData(response)
    }

    // 데이터가 없을 경우에만 데이터 패칭
    if (data === null) fetchData()
  }, [isApiQuotaExhausted])

  return data
}

export default useYoutubeDataRequest
