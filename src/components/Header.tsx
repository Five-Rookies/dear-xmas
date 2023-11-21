import React from 'react'
import { useRouter } from 'next/navigation'

interface IHeader {
  search: string
  setSearch: (e: string) => void
  handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = (props: IHeader): React.ReactNode => {
  const router = useRouter()
  const backPage = () => {
    router.replace('/')
    props.setSearch('')
  }
  return (
    <>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        autoFocus
        autoComplete="off"
        value={props.search}
        onChange={props.handleSearchValue}
      />
      <button type="button" onClick={backPage}>
        닫기
      </button>
    </>
  )
}

export default Header
