import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Link from 'next/link'

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
        <Link href="/search">검색</Link> {children}
      </body>
    </html>
  )
}
