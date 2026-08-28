
import React, { ReactNode } from 'react'
import Header from '../components/Header'


interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main className="main">
        <div className="content">
          {children}
        </div>
      </main>
      
    </div>
  )
}