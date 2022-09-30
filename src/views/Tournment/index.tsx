import React, { useEffect } from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"
import { v4 as uuidv4 } from "uuid"

interface TournmentProps {}

export const Tournment = ({}: TournmentProps) => {
  const { socket, tournmentBrackets } = useSocketContext()

  useEffect(() => {
    socket?.emit("next_battle")
  }, [])

  return (
    <BaseLayout>
      <h1>Tournment brackets: </h1>
      {tournmentBrackets?.map(brackets => (
        <div key={uuidv4()}>
          {brackets.map(player => (
            <p
              key={uuidv4()}
              style={{
                background:
                  player?.winner === true
                    ? "green"
                    : player?.winner === false
                    ? "red"
                    : undefined,
                border: "1px solid black",
                display: "inline-block",
                padding: "10px",
                minWidth: "60px",
                minHeight: "20px"
              }}
            >
              {player?.name}
            </p>
          ))}
        </div>
      ))}
    </BaseLayout>
  )
}
