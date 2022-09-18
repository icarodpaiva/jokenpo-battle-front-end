import React from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"
import type { View } from "../../types/View"

interface LobbyProps {
  setView: (view: View) => void
}

export const Lobby = ({ setView }: LobbyProps) => {
  let { allPlayers } = useSocketContext()

  return (
    <BaseLayout>
      <h1>Players online: {allPlayers?.length ?? 0}</h1>

      {allPlayers?.map(({ id, name }) => (
        <h2 key={id}>{name}</h2>
      ))}

      <button onClick={() => setView("EnterRoom")}>back</button>
    </BaseLayout>
  )
}
