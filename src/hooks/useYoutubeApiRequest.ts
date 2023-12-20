'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import useStore from '@/status/store'
import { IYoutubeResponse } from '@/type/YoutubeApiResponse'

const printErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
  }
}

const youtubeApiRequest = async (
  setQuotaExhausted: () => void,
  optionalQuery: string,
  maxResults: number,
  pageToken: string | undefined,
) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const baseURL = process.env.NEXT_PUBLIC_YOUTUBE_API_BASE_URL
  const commonQuery = `&nextPageToken=${pageToken}&regionCode=kr&type=video&order=relevance&videoSyndicated=true&maxResults=${maxResults}`
  const URL = `${baseURL}${commonQuery}${optionalQuery}&key=${ACCESS_KEY}`

  try {
    const youtubeApiData = await axios.get(URL)
    return youtubeApiData.data
  } catch (error) {
    printErrorMessage(error)
    setQuotaExhausted()
    throw new Error('[ERROR] Youtube API 요청 불가. JSON 데이터로 대체합니다.')
  }
}

const youtubeJsonRequest = async (apiType: string, optionalQuery: string) => {
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
    printErrorMessage(error)
    throw new Error('[ERROR] 유효하지 않은 JSON 데이터 요청입니다.')
  }
}

const useYoutubeDataRequest = (
  apiType: string,
  optionalQuery: string,
  maxResults: number,
  pageToken: string | undefined,
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
            pageToken,
          )
        } catch (error) {
          printErrorMessage(error)
          response = await youtubeJsonRequest(apiType, optionalQuery)
        }
      }
      setData(response)
    }

    fetchData()
  }, [isApiQuotaExhausted])

  return data
}

export default useYoutubeDataRequest