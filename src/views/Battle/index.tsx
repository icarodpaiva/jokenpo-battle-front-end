import { useEffect, useState } from "react"
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
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    },
    []
  )

  useEffect(() => {
    if (!battleSituation?.draw) {
      return
    }

    const delayDraw = setTimeout(() => {
      setPlayerMove("")
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    }, 3000)

    return () => clearTimeout(delayDraw)
  }, [battleSituation?.draw])

  const isPlayer1 = idPlayer === battlePlayers?.player1.id
  const isPlayer2 = idPlayer === battlePlayers?.player2?.id

  const disabledP1 = !isPlayer1 || !!playerMove
  const disabledP2 = !isPlayer2 || !!playerMove

  const showBattleSituation =
    battleSituation && battleSituation.winner && battleSituation.looser

  const handleMove = (move: string) => {
    setPlayerMove(move)
    socket?.emit("player_move", move)
  }

  return (
    <>
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
        <h1>{battlePlayers?.player2?.name}</h1>
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

      <div style={{ background: "aqua", padding: 20 }}>
        {showBattleSituation && (
          <>
            <p>{battleSituation?.winner?.name} ganhou</p>
            <p>{battleSituation?.looser?.name} perdeu</p>
          </>
        )}

        {battleSituation?.draw && <p>Empate</p>}
      </div>
    </>
  )
}
