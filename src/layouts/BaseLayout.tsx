import React from "react"

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
