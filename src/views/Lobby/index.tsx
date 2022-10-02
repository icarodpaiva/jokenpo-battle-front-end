import { useSocketContext } from "../../contexts/SocketContext"

export const Lobby = () => {
  const { setView, socket, playersList } = useSocketContext()

  if (!playersList || playersList.length <= 0) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <h1>Players online: {playersList?.length ?? 0}</h1>

      {playersList?.map(({ id, name }) => (
        <h2 key={id}>{name}</h2>
      ))}

      <button onClick={() => socket?.emit("tournment_start")}>start</button>
      <br />
      <button onClick={() => setView?.("EnterRoom")}>back</button>
    </>
  )
}
