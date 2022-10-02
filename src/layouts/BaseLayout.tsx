import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

interface BaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
