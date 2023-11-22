import React from 'react'
import type { Metadata } from 'next'
import './globals.scss'
import Header from '../components/layout/Header'

export const metadata: Metadata = {
  title: 'Christmas',
  description: 'Christmas playground project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
