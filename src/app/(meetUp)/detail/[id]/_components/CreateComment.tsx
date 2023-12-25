'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createComments } from '@/utils/apiRequest/commentsApiRequest'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'
import { debounce } from 'lodash'
import { TProfile } from '@/type/SupabaseResponse'

const CreateComment = ({
  profile,
  fetchComments,
}: {
  profile: number
  fetchComments: () => Promise<void>
}) => {
  const pathParam: string = usePathname()
  const paramArr: string[] = pathParam.split('/')
  const videoId: string = paramArr[paramArr.length - 1]
  const inputValue = useRef<HTMLInputElement>(null)
  const [userName, setUserName] = useState<string | undefined>('')

  const getUserName = async (): Promise<void> => {
    const userData: TProfile = await getProfileByEmail()
    setUserName(userData.user_name!)
  }

  const handleCreateCommnet = debounce(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (inputValue?.current?.value) {
          await createComments(
            inputValue.current.value,
            videoId,
            userName,
            profile,
          )
          inputValue.current.value = ''
          fetchComments()
        }
      }
    },
    500,
  )

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <>
      <input
        ref={inputValue}
        type="text"
        placeholder="댓글을 남겨주세요"
        onKeyDown={handleCreateCommnet}
      />
    </>
  )
}
export default CreateComment
