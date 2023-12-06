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
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body style={{ overflowX: 'hidden' }}>
        <Header />
        {children}
        <ScrollBtn />
        <Footer />
      </body>
    </html>
  )
}
