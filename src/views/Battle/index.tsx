import { useEffect, useState } from "react"
import { useSocketContext } from "../../contexts/SocketContext"
import { BattleBoard } from "../../components/BattleBoard"
import { BattleMovesPlayers } from "../../components/BattleMoves"
import rock from "../../assets/images/rock.png"
import paper from "../../assets/images/paper.png"
import scissors from "../../assets/images/scissors.png"
import "./battle.scss"

export const Battle = () => {
  const [playerMove, setPlayerMove] = useState("")
  const [showBattleSituation, setShowBattleSituation] = useState(false)

  const {
    socket,
    idPlayer,
    battlePlayers,
    battleMoves,
    setBattleMoves,
    battleSituation,
    setBattleSituation
  } = useSocketContext()

  const images = { rock, paper, scissors }

  const isPlayer1 = idPlayer === battlePlayers?.player1.id
  const isPlayer2 = idPlayer === battlePlayers?.player2?.id

  const player1Disabled = !isPlayer1 || !!playerMove
  const player2Disabled = !isPlayer2 || !!playerMove

  const handleMove = (move: string) => {
    setPlayerMove(move)
    socket?.emit("player_move", move)
  }

  const showMoves = !!(battleMoves?.player1 && battleMoves?.player2)

  // reset battle situation
  useEffect(
    () => () => {
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!battleSituation?.draw) {
      return
    }

    const delayPlayAgain = setTimeout(() => {
      setPlayerMove("")
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    }, 3000)

    return () => clearTimeout(delayPlayAgain)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleSituation?.draw])

  useEffect(() => {
    if (!battleSituation?.winner) {
      return
    }

    const delayShowBattleSituation = setTimeout(() => {
      setShowBattleSituation(true)
    }, 2500)

    return () => clearTimeout(delayShowBattleSituation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleSituation?.winner])

  return (
    <div className="battle-container">
      <BattleBoard
        playerName={battlePlayers?.player1.name}
        disabled={player1Disabled}
        handleMove={handleMove}
        images={images}
      />

      {showMoves && (
        <BattleMovesPlayers images={images} battleMoves={battleMoves} />
      )}

      {showBattleSituation && (
        <div className="battleSituation-container">
          {battleSituation?.winner?.name && (
            <>
              {/* remove this mock later, when the backend return the player option */}
              <img src={images["paper"]} alt="paper" />
              <p>{battleSituation?.winner?.name}</p>
            </>
          )}
          {battleSituation?.draw && <p>Empate</p>}
        </div>
      )}

      <BattleBoard
        playerName={battlePlayers?.player2?.name}
        disabled={player2Disabled}
        handleMove={handleMove}
        images={images}
      />
    </div>
  )
}
