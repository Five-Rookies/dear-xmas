'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  createComments,
  getComments,
} from '@/utils/apiRequest/commentsApiRequest'
import { usePathname } from 'next/navigation'
import IComments from '@/type/SupabaseRespons'

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
  const [comment, setComment] = useState({})
  const inputValue = useRef<HTMLInputElement>(null)
  const handleCreate = async (e: any) => {
    if (e.key === 'Enter') {
      if (inputValue?.current?.value) {
        const res = await createComments(
          inputValue.current.value,
          videoId,
          '기본 사용자',
          profile,
        )

        res && setComment(res)
        await renderUpdatedComment()
        inputValue.current.value = ''
      }
    }
  }

  const renderUpdatedComment = async () => {
    let totalComments = await getComments(videoId)
    if (!totalComments) {
      totalComments = []
    }
    setComments(totalComments)
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
