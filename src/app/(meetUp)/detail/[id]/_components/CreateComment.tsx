'use client'

import React, { useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  createComments,
  getComments,
} from '@/utils/apiRequest/commentsApiRequest'
import IComments from '@/type/SupabaseResponse'

const CreateComment = ({
  profile,
  setComments,
}: {
  profile: number
  setComments: (e: IComments[]) => void
}) => {
  const pathParam = usePathname()
  const paramArr = pathParam.split('/')
  const videoId = paramArr[paramArr.length - 1]
  const inputValue = useRef<HTMLInputElement>(null)
  const handleCreate = async (e: any) => {
    if (e.key === 'Enter') {
      if (inputValue?.current?.value) {
        await createComments(
          inputValue.current.value,
          videoId,
          '기본 사용자',
          profile,
        )
        inputValue.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={inputValue}
        type="text"
        placeholder="댓글을 남겨주세요"
        onKeyPress={handleCreate}
      />
    </>
  )
}
export default CreateComment
