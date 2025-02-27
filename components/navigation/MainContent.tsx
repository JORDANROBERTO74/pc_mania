'use client'

import React from 'react'

interface PropsType {
  children?: React.ReactNode
}

const MainContent = ({ children }: PropsType) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-8 pt-16 pb-4">
        {children}
      </main>
    </div>
  )
}
export default MainContent
