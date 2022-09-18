import React, { useRef, useState } from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"
import { io } from "socket.io-client"
import { View } from "../../types/View"

interface EnterRoomProps {
  setView: (view: View) => void
}

export const EnterRoom = ({ setView }: EnterRoomProps) => {
  const [errorMsg, setErrorMsg] = useState("")
  const nameRef = useRef<HTMLInputElement | null>(null)
  const { setSocket } = useSocketContext()

  const handleConnect = () => {
    const name = nameRef.current?.value

    if (!name || name.length <= 2) {
      setErrorMsg("Please, write a nickname with 3 characteres or more")
      return
    }

    setSocket?.(
      io(process.env.GATSBY_API_URL ?? "http://localhost:3000").emit(
        "name",
        nameRef.current?.value
      )
    )

    setView("Lobby")
  }

  return (
    <BaseLayout>
      <div>
        <input type="text" ref={nameRef} />
        <button onClick={handleConnect}>Connect</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </BaseLayout>
  )
}
