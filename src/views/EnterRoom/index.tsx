import { useRef, useState } from "react"
import { useSocketContext } from "../../contexts/SocketContext"
import { io } from "socket.io-client"

interface EnterRoomProps {}

export const EnterRoom = ({}: EnterRoomProps) => {
  const [errorMsg, setErrorMsg] = useState("")
  const nameRef = useRef<HTMLInputElement | null>(null)
  const { setView, setSocket, idPlayer } = useSocketContext()

  const handleConnect = () => {
    // prevent double connect
    if (idPlayer) {
      return
    }

    const name = nameRef.current?.value

    if (!name || name.length <= 2) {
      setErrorMsg("Please, write a nickname with 3 characteres or more")
      return
    }

    setSocket?.(
      io(process.env.GATSBY_API_URL ?? "http://localhost:3000").emit(
        "player_connect",
        name
      )
    )

    setView?.("Lobby")
  }

  return (
    <div>
      <input type="text" ref={nameRef} />
      <button onClick={handleConnect}>Connect</button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  )
}
