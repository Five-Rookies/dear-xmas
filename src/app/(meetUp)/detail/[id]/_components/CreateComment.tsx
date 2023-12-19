'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createComments } from '@/utils/apiRequest/commentsApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'

const CreateComment = ({
  profile,
  fetchComments,
}: {
  profile: number
  fetchComments: () => Promise<void>
}) => {
  const pathParam = usePathname()
  const paramArr = pathParam.split('/')
  const videoId = paramArr[paramArr.length - 1]
  const inputValue = useRef<HTMLInputElement>(null)
  const [userName, setUserName] = useState<string | undefined>()

  const getUserName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUserName(user?.user_metadata.user_name)
  }

  const handleCreateCommnet = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <>
      <input
        ref={inputValue}
        type="text"
        placeholder="댓글을 남겨주세요"
        onKeyDown={e => handleCreateCommnet(e)}
      />
    </>
  )
}
export default CreateComment
