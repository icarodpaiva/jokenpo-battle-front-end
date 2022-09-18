import React from "react"
import { useSocketContext } from "../contexts/SocketContext"
import { EnterRoom } from "../views/EnterRoom"
import { Lobby } from "../views/Lobby"
import { Tournment } from "../views/Tournment"

const IndexPage = () => {
  const { view } = useSocketContext()

  return (
    <div className="main-container">
      {view === "EnterRoom" && <EnterRoom />}
      {view === "Lobby" && <Lobby />}
      {view === "Tournment" && <Tournment />}
    </div>
  )
}

export default IndexPage
