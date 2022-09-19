import React from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"

interface TournmentProps {}

export const Tournment = ({}: TournmentProps) => {
  const { setView, tournmentBrackets } = useSocketContext()

  return (
    <BaseLayout>
      <h1>Tournment brackets: </h1>
      {tournmentBrackets?.map((rows, index) => (
        <div key={index}>
          {rows.map((player, index) => (
            <p
              key={player?.id ?? index}
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

      <br />
      <br />

      <button onClick={() => setView?.("Lobby")}>back</button>
    </BaseLayout>
  )
}
