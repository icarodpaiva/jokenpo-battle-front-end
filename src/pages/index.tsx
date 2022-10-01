import React from "react"
import { SocketProvider } from "../contexts/SocketContext"
import { ViewsContainer } from "../views"

const IndexPage = () => {
  return (
    <SocketProvider>
      <ViewsContainer />
    </SocketProvider>
  )
}

export default IndexPage
