import React from 'react'
import KonsumenNavbar from '@/components/organisms/KonsumenNavbar'

export default function KonsumenLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <KonsumenNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
