import React from 'react'
import { Header } from '../components/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header></Header>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </>
  )
}
