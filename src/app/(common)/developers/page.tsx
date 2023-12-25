import React from 'react'
import { IDeveloper } from '@/type/Component'
import Image from 'next/image'
import styles from './developers.module.scss'
import Member from './Member'

const titleInfo = (subTItle: string, title: string, intro: string) => {
  return (
    <div className={styles.title}>
      <h4>{subTItle}</h4>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}
const skills = [
  'next',
  'typescript',
  'sass',
  'zustand',
  'supabase',
  'github',
  'figma',
  'youtube',
]

const developer: IDeveloper[] = [
  {
    name: '유재영',
    img: 'yoo',
    intro: '오늘보다 내일 더 성장하는 프론트엔드 개발자 입니다.',
    github: 'https://github.com/zxxng',
    email: 'wodud198967@gmail.com',
  },
  {
    name: '송수빈',
    img: 'song',
    intro: 'Interactive Web 개발자를 꿈꾸고 있습니다',
    github: 'https://github.com/ssb1565b',
    email: 'ssongsumovie@naver.com',
  },
  {
    name: '이준엽',
    img: 'lee',
    intro: '꾸준함을 중요시 하는 개발자 입니다.',
    github: 'https://github.com/dv-yeop920',
    email: 'jyeop920@gmail.com',
  },
  {
    name: '윤선영',
    img: 'yoon',
    intro: '넘어져도 다시 일어나는 오뚝이 같은 개발자입니다.',
    github: 'https://github.com/seonyeongyoon',
    email: 'sun940204@naver.com',
  },
]
const Developers = () => {
  return (
    <>
      <section className={styles.skillContainer}>
        <div className="inner-box">
          {titleInfo(
            '기술 스택',
            '함께 선정한 기술들',
            '저희는 새로운 기술 학습을 위해 3개월 전 업데이트 된 Next.js 14를 도입하여 제작하였습니다.',
          )}
          <ul className={styles.skills}>
            {skills.map((skill: string) => {
              return (
                <li key={skill}>
                  <Image
                    src={`/assets/skills/skill-${skill}.svg`}
                    width={0}
                    height={0}
                    sizes="4.5rem"
                    style={{ width: '100%', height: 'auto' }}
                    alt={skill}
                    priority
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section>
        <div className={styles.developersContainer}>
          {titleInfo(
            '멤버 소개',
            '함께 만든 사람들',
            '멋쟁이 사자처럼 프론트엔드 심화과정에서 팀프로젝트를 함께 하게된 5조, Five Rookies입니다.',
          )}
          <div className={styles.developerBox}>
            {developer?.map((member: IDeveloper) => {
              return <Member key={member.name} member={member} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}
export default Developers
