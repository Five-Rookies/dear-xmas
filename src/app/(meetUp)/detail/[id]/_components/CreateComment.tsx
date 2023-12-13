'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createComments } from '@/utils/apiRequest/commentsApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { User } from '@supabase/supabase-js'

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
  const [user, setUser] = useState<User>()

  const getUserName = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setUser(session?.user)
  }

  const handleCreateCommnet = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (inputValue?.current?.value) {
        await createComments(
          inputValue.current.value,
          videoId,
          user?.user_metadata.user_name,
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
        onKeyPress={handleCreateCommnet}
      />
    </>
  )
}
export default CreateComment
