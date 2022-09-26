import React, { useEffect } from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"

interface TournmentProps {}

export const Tournment = ({}: TournmentProps) => {
  const { tournmentBrackets, socket, setView } = useSocketContext()

  useEffect(() => {
    const delayBattleBegin = window.setTimeout(() => {
      socket?.emit("battle_begin")
    }, 5000)

    return () => {
      clearTimeout(delayBattleBegin)
      setView?.("Battle")
    }
  }, [])

  return (
    <BaseLayout>
      <h1>Tournment brackets: </h1>
      {tournmentBrackets?.map((brackets, index) => (
        <div key={index}>
          {brackets.map((player, index) => (
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
    </BaseLayout>
  )
}
