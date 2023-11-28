import React from 'react'
import styles from './developers.module.scss'
import { IDeveloper } from '@/type/Component'
import Link from 'next/link'

const Member = ({ member }: { member: IDeveloper }) => {
  const githubId = member.github.split('/')
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
        <img
          src={`https://ghchart.rshah.org/${githubId[githubId.length - 1]}`}
        />
      </div>
    </div>
  )
}

export default Member
