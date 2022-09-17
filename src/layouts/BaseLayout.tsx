import React from "react"
import "../styles/global.scss"

interface BaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </>
  )
}
