import React from 'react'
import type { Metadata } from 'next'
import './globals.scss'
import Header from './(common)/_components/Header'
import Footer from './(common)/_components/Footer'
import ScrollBtn from './(common)/_components/ScrollBtn'
import Profile from './(common)/_components/Profile'

export const metadata: Metadata = {
  title: 'Dear,Xmas',
  description: 'Christmas playground project',
}

export default function RootLayout({ children, createSurveyModal }: React.ReactNode,

) {
  return (
    <html>
      <body style={{ overflowX: 'hidden' }}>
        <Header />
        {children}
        {createSurveyModal}
        <ScrollBtn />
        <Footer />
      </body>
    </html>
  )
}
