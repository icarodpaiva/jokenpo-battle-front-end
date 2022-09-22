import React from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"

interface LobbyProps {}

export const Lobby = ({}: LobbyProps) => {
  const { setView, socket, playersList } = useSocketContext()

  console.log(socket)

  if (!playersList || playersList.length <= 0) {
    return <h3>Loading...</h3>
  }

  return (
    <BaseLayout>
      <h1>Players online: {playersList?.length ?? 0}</h1>

      {playersList?.map(({ id, name }) => (
        <h2 key={id}>{name}</h2>
      ))}

      <button onClick={() => socket?.emit("tournment_start")}>start</button>
      <br />
      <button onClick={() => setView?.("EnterRoom")}>back</button>
    </BaseLayout>
  )
}
