import React, { useEffect, useState } from "react"
import { BaseLayout } from "../../layouts/BaseLayout"
import { useSocketContext } from "../../contexts/SocketContext"

interface EnterRoomProps {}

export const Battle = ({}: EnterRoomProps) => {
  const [playerMove, setPlayerMove] = useState("")
  const {
    socket,
    idPlayer,
    battlePlayers,
    setBattlePlayers,
    battleMoves,
    setBattleMoves,
    battleSituation,
    setBattleSituation
  } = useSocketContext()

  // reset battle situation
  useEffect(
    () => () => {
      setBattlePlayers?.(undefined)
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    },
    []
  )

  const isPlayer1 = idPlayer === battlePlayers?.player1.id
  const isPlayer2 = idPlayer === battlePlayers?.player2?.id

  const disabledP1 = !isPlayer1 || !!playerMove
  const disabledP2 = !isPlayer2 || !!playerMove

  const showBattleSituation =
    battleSituation && battleSituation.winner && battleSituation.looser

  const handleMove = (move: string) => {
    setPlayerMove(move)
    socket?.emit("player_move", { isPlayer1, isPlayer2, move })
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
        <button disabled={disabledP1} onClick={() => handleMove("scissor")}>
          Tesoura
        </button>
      </div>
      <p>{battleMoves?.player1}</p>
      <hr />
      <p>{battleMoves?.player2}</p>
      <div>
        <h1>{battlePlayers?.player2?.name}</h1>
        <button disabled={disabledP2} onClick={() => handleMove("rock")}>
          Pedra
        </button>
        <button disabled={disabledP2} onClick={() => handleMove("paper")}>
          Papel
        </button>
        <button disabled={disabledP2} onClick={() => handleMove("scissor")}>
          Tesoura
        </button>
      </div>

      {showBattleSituation && (
        <div style={{ background: "aqua", padding: 20 }}>
          <p>{battleSituation?.winner?.name} ganhou</p>
          <p>{battleSituation?.looser?.name} perdeu</p>
        </div>
      )}
    </BaseLayout>
  )
}
