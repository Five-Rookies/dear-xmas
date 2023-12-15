'use client'

import React, { useEffect, useState } from 'react'
import { IMeetupBoardData } from '@/type/Component'
import { dateFomatter, dateDifference } from '@/utils/calculateTimeUntilDay'
import Link from 'next/link'
import {
  updateMember,
  getPrevMember,
  getMeetupList,
} from '@/utils/apiRequest/meetupApiRequest'
import styles from '../meetup.module.scss'
import btn from '@/app/globalButton.module.scss'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
const APPLY = '참가신청'
const MeetupBox = ({
  meetup,
  fetchMeetupList,
}: {
  meetup: IMeetupBoardData
  fetchMeetupList: () => void
}) => {
  const [userName, setUserName] = useState('')

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUserName(data.session?.user.user_metadata.user_name)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  const handleMember = async (id: number, user_name: string, status: any) => {
    const prevMember = await getPrevMember(id)
    if (status.target.innerText === APPLY) {
      const memberArr = [...prevMember.member_list, userName]
      if (
        [...prevMember.member_list].includes(userName) ||
        user_name.includes(userName)
      ) {
        return alert('이미 참가하였습니다.')
      }
      await updateMember(id, memberArr)
    } else {
      const memberArr = prevMember.member_list.filter(
        (member: string) => member !== userName,
      )
      await updateMember(id, memberArr)
    }
    fetchMeetupList()
  }

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

            {(meetup?.user_name === userName ||
              meetup?.member_list?.includes(userName)) && (
              <Link
                href={`/live?meetup_id=${meetup?.id}`}
                className={`${btn.button} ${btn.buttonGrayBg}`}
              >
                라이브 바로가기
              </Link>
            )}
            {meetup?.user_name !== userName && (
              <button
                onClick={(e: React.MouseEvent) =>
                  handleMember(meetup?.id!, meetup?.user_name!, e)
                }
                className={`${btn.button} ${btn.buttonRed}`}
              >
                {[...meetup?.member_list!].includes(userName)
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
            <button>
              <img src="/assets/like.svg" alt="좋아요" />
              <span>
                {meetup.meetup_like_num ? meetup.meetup_like_num : 0}명
              </span>
            </button>
            {/*<button>
        <img src="/assets/like.svg" alt="댓글" />
        <span>10개 댓글</span>
        </button>*/}
          </div>
        </div>
        {/*<div className={styles.comment}>
<input type="text" placeholder="하고 싶은 말을 적어봐요!" />
<div className={styles.commentContainer}>
  <div>
    <p className={`${styles.comment} ${styles.writer}`}>
      <span>성냥팔이소녀</span> ·<span>1시간 전</span>
    </p>
    <button
      className={
        isDotMenuVisible
          ? `${styles.moreBtn} ${styles.active}`
          : styles.moreBtn
      }
      onClick={handleDotMenu}
    >
      ⋮
    </button>
    {isDotMenuVisible && (
      <div className={styles.dotMenu}>
        <button onClick={() => handleEditButton()}>수정</button>
        <button onClick={() => handleDeleteButton()}>삭제</button>
      </div>
    )}
  </div>
  <p>
    2023년 많은 사항 받은 인기팝송 총모음.. 치열한 지하철에서
    크리스마스의 즐거움을 느낄 수 있는 .. 그런 .. 희망창 플레이
    리스트.. 모두
  </p>
</div>
</div>*/}
      </div>
    </div>
  )
}

export default MeetupBox