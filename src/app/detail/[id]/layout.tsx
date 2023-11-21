import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '상세페이지',
}

const Layout = (props) => {
  return (
    <>
      {props.children}
    </>
  )
}

export default Layout;