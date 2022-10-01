import React from "react"
import { SocketProvider } from "./src/contexts/SocketContext"
import type { GatsbyBrowser } from "gatsby"
import "./src/styles/global.scss"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element
}) => {
  return <SocketProvider>{element}</SocketProvider>
}
