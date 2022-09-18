import React, { useState } from "react"
import { SocketProvider } from "../contexts/SocketContext"
import { EnterRoom } from "../views/EnterRoom"
import { Lobby } from "../views/Lobby"
import type { View } from "../types/View"
import "../styles/global.scss"

const IndexPage = () => {
  const [view, setView] = useState<View>("EnterRoom")

  return (
    <SocketProvider>
      {view === "EnterRoom" && <EnterRoom setView={setView} />}
      {view === "Lobby" && <Lobby setView={setView} />}
    </SocketProvider>
  )
}

export default IndexPage
