import { useEffect, useState } from 'react'
import { useSocketContext } from '../../contexts/SocketContext'
import { BattleButtons } from '../../components/BattleButtons'

export const Battle = () => {
  const [playerMove, setPlayerMove] = useState('')
  const {
    socket,
    idPlayer,
    battlePlayers,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!battleSituation?.draw) {
      return
    }

    const delayDraw = setTimeout(() => {
      setPlayerMove('')
      setBattleMoves?.(undefined)
      setBattleSituation?.(undefined)
    }, 3000)

    return () => clearTimeout(delayDraw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleSituation?.draw])

  const isPlayer1 = idPlayer === battlePlayers?.player1.id
  const isPlayer2 = idPlayer === battlePlayers?.player2?.id

  const disabled = !isPlayer1 || !isPlayer2 || !!playerMove

  const showBattleSituation =
    battleSituation && battleSituation.winner && battleSituation.looser

  const handleMove = (move: string) => {
    setPlayerMove(move)
    socket?.emit('player_move', move)
  }

  return (
    <>
      <div>
        <h1>{battlePlayers?.player1.name}</h1>
        <BattleButtons disabled={disabled} handleMove={handleMove} />
      </div>
      <p>{battleMoves?.player1}</p>
      <hr />
      <p>{battleMoves?.player2}</p>
      <div>
        <h1>{battlePlayers?.player2?.name}</h1>
        <BattleButtons disabled={disabled} handleMove={handleMove} />
      </div>

      <div style={{ background: 'aqua', padding: 20 }}>
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
