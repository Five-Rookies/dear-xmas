'use client'
import React, { useEffect, useState } from 'react'
import styles from './developers.module.scss'
import { IDeveloper } from '@/type/Component'
import Link from 'next/link'
import GitHubCalendar from 'react-github-calendar'

// type
interface Day {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const selectLastHalfYear = (contributions: Day[], shownMonths: number) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  return contributions.filter((day: Day) => {
    const date = new Date(day.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    const monthDiff = (currentYear - year) * 12 + (currentMonth - month)
    return monthDiff < shownMonths
  })
}

const Member = ({ member }: { member: IDeveloper }) => {
  const [displayWidth, setDisplayWidth] = useState(8)
  const githubId = member.github.split('/')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= 768 && width >= 480) {
        setDisplayWidth(10)
      } else {
        setDisplayWidth(8)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className={styles.memberBox}>
      <div className={styles.memberInfo}>
        <img src={`/assets/mimoticon/mimoticon-${member.img}.png`} alt="" />
        <div className={styles.textBox}>
          <p className={styles.name}>
            {member.name}
            <span>FE/BE{member.img == 'song' && '/UIUX'}</span>
          </p>
          <p className={styles.introdution}>{member.intro}</p>
          <div className={styles.contact}>
            <Link href={member.github}>{member.github.slice(8)}</Link>&nbsp;|{' '}
            {member.email}
          </div>
        </div>
      </div>
      <div className={styles.githubContainer}>
        <GitHubCalendar
          username={githubId[githubId.length - 1]}
          blockSize={12}
          transformData={day => selectLastHalfYear(day, displayWidth)}
        />
      </div>
    </div>
  )
}

export default Member
