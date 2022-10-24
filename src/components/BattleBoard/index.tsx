import type { Moves } from "../../types/global"
import "./battleBoard.scss"

export interface Images {
  rock: string
  paper: string
  scissors: string
}

interface BattleBoardProps {
  playerName?: string
  disabled: boolean
  handleMove: (move: string) => void
  images: Images
}

export const BattleBoard = ({
  playerName,
  disabled,
  handleMove,
  images
}: BattleBoardProps) => {
  return (
    <div className="battleBoard-container">
      <h1>{playerName}</h1>
      <div className="battleButtons-container">
        {Object.keys(images).map(move => (
          <button disabled={disabled} onClick={() => handleMove(move)}>
            <img src={images[move as Moves]} alt={move} />
          </button>
        ))}
      </div>
    </div>
  )
}
