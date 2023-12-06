import React from 'react'
import type { Metadata } from 'next'
import './globals.scss'
import Header from './_components/Header'
import Footer from './_components/Footer'
import ScrollBtn from './(common)/_components/ScrollBtn'

export const metadata: Metadata = {
  title: 'Dear,Xmas',
  description: 'Christmas playground project',
}

export default function RootLayout({
  children,
  main,
  meetuplist,
  slot,
  survey
}: {
  children: React.ReactNode
  main: React.ReactNode
  meetuplist: React.ReactNode
  slot: React.ReactNode
  survey: React.ReactNode
}) {
  return (
    <html>
      <body style={{ overflowX: 'hidden' }}>
        <Header />
        {children}
        {main}
        {meetuplist}
        {slot}
        {survey}
        <ScrollBtn />
        <Footer />
      </body>
    </html>
  )
}
