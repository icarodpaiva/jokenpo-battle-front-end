import React, { useState } from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"

interface EnterRoomProps {}

export const Battle = ({}: EnterRoomProps) => {
  const [playerMove, setPlayerMove] = useState("")
  const { idPlayer, battlePlayers, socket, battleMoves } = useSocketContext()

  console.log("battleMoves", battleMoves)

  const isPlayer1 = idPlayer === battlePlayers?.player1.id
  const isPlayer2 = idPlayer === battlePlayers?.player2.id

  const disabledP1 = !isPlayer1 || !!playerMove
  const disabledP2 = !isPlayer2 || !!playerMove

  const handleMove = (move: string) => {
    setPlayerMove(move)
    socket?.emit("player_move", { isPlayer1, isPlayer2, playerMove })
  }

  return (
    <BaseLayout>
      <div>
        <h1>{battlePlayers?.player1.name}</h1>
        <button disabled={disabledP1} onClick={() => handleMove("rock")}>
          Pedra
        </button>
        <button disabled={disabledP1} onClick={() => handleMove("paper")}>
          Papel
        </button>
        <button disabled={disabledP1} onClick={() => handleMove("scissors")}>
          Tesoura
        </button>
      </div>
      <p>{battleMoves?.player1}</p>
      <hr />
      <p>{battleMoves?.player2}</p>
      <div>
        <h1>{battlePlayers?.player2.name}</h1>
        <button disabled={disabledP2} onClick={() => handleMove("rock")}>
          Pedra
        </button>
        <button disabled={disabledP2} onClick={() => handleMove("paper")}>
          Papel
        </button>
        <button disabled={disabledP2} onClick={() => handleMove("scissors")}>
          Tesoura
        </button>
      </div>
    </BaseLayout>
  )
}
