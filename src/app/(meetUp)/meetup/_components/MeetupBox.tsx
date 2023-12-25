'use client'

import React, { useEffect, useState } from 'react'
import { ILike, IMeetupBoardData } from '@/type/Component'
import { dateFomatter, dateDifference } from '@/utils/calculateTimeUntilDay'
import Link from 'next/link'
import {
  updateMember,
  getPrevMember,
} from '@/utils/apiRequest/meetupApiRequestClient'
import likeOn from '@public/assets/likeOn.svg'
import likeOff from '@public/assets/likeOff.svg'
import btn from '@/app/globalButton.module.scss'
import {
  checkLike,
  createLike,
  getLike,
  removeLike,
  countLike,
} from '@/utils/apiRequest/likeApiRequest'
import Image from 'next/image'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'
import { Tables } from '@/type/supabase'
import { debounce } from 'lodash'
import styles from '../meetup.module.scss'

const APPLY = '참가신청'

const MeetupBox = ({
  meetup,
  fetchMeetupList,
}: {
  meetup: IMeetupBoardData
  fetchMeetupList: () => void
}): React.JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number | undefined>(0)

  const fetchData = async (): Promise<void> => {
    const userData: Tables<'profiles'> = await getProfileByEmail()
    setUserEmail(userData?.email!)
    if (userData.id && meetup.id) {
      const isLike = await getLike(userData.id, meetup.id, 'meetup_like')
      const likeLength: number | undefined = await countLike(
        meetup.id,
        'meetup_like',
      )
      setIsLiked(isLike)
      setLikeCount(likeLength)
    }
    setUserId(userData.id)
  }

  const handleMember = debounce(
    async (id: number, email: string, status: any): Promise<void> => {
      const prevMember = await getPrevMember(id)
      if (status.target.innerText === APPLY) {
        const memberArr = [...prevMember.member_list, userEmail]
        if (
          [...prevMember.member_list].includes(userEmail) ||
          email.includes(userEmail)
        ) {
          return alert('이미 참가하였습니다.')
        }
        await updateMember(id, memberArr)
      } else {
        const memberArr = prevMember.member_list.filter(
          (member: string) => member !== userEmail,
        )
        await updateMember(id, memberArr)
      }
      fetchMeetupList()
    },
    500,
  )

  const handleLike = debounce(async () => {
    const checkIsLiked: ILike[] = await checkLike(
      userId,
      meetup?.id!,
      'meetup_like',
    )

    if (checkIsLiked.length <= 0) {
      await createLike(userId, meetup?.id!, 'meetup_like')
      setLikeCount(likeCount =>
        likeCount !== undefined ? likeCount + 1 : undefined,
      )
    }

    if (checkIsLiked.length > 0) {
      await removeLike(userId!, meetup?.id!, 'meetup_like')
      setLikeCount(likeCount =>
        likeCount !== undefined ? likeCount - 1 : undefined,
      )
    }
    setIsLiked(!isLiked)
  }, 500)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div key={meetup.id} className={styles.meetupList}>
      <div className={styles.meetupPost}>
        <div className={styles.titleArea}>
          <h2>
            <span>{meetup.category}</span> <i>|</i> {meetup.meetup_title}
          </h2>
          <div className={styles.openNotice}>
            {new Date(meetup?.scheduling as string) < new Date() ? (
              <p>실시간 중계중</p>
            ) : (
              <p>{dateFomatter(meetup?.scheduling)} 오픈예정</p>
            )}

            {(meetup?.email === userEmail ||
              meetup?.member_list?.includes(userEmail)) && (
              <Link
                href={`/live?meetup_id=${meetup?.id}`}
                className={`${btn.button} ${btn.buttonGrayBg}`}
              >
                라이브 바로가기
              </Link>
            )}
            {meetup?.email !== userEmail && (
              <button
                onClick={(e: React.MouseEvent) =>
                  handleMember(meetup?.id!, meetup?.email!, e)
                }
                className={`${btn.button} ${btn.buttonRed}`}
              >
                {[...meetup?.member_list!].includes(userEmail)
                  ? '신청취소'
                  : APPLY}
              </button>
            )}
          </div>
        </div>
        <p className={styles.writer}>
          <span>{meetup.user_name}</span> · &nbsp;
          <span>{dateDifference(meetup?.created_at)}</span> · &nbsp;
          <span>{meetup?.member_list?.length}명 참가중</span>
        </p>
        <div className={styles.textContent}>
          <p>{meetup.meetup_content}</p>
          <p className={styles.previewVideo}>
            <Link href={`/detail/${meetup.video_id}`}>영상 미리보기</Link>
          </p>
        </div>
        <div className={styles.buttonArea}>
          <div>
            <button onClick={() => handleLike()}>
              <Image
                width="0"
                height="0"
                style={{ width: 'auto', height: 'auto' }}
                className={isLiked ? styles.likeOn : styles.likeOff}
                src={isLiked ? likeOn : likeOff}
                alt="좋아요"
              />
              <span>{likeCount}명</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetupBox
