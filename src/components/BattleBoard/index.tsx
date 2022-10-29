import rock from "../../assets/images/board/rock.png"
import paper from "../../assets/images/board/paper.png"
import scissors from "../../assets/images/board/scissors.png"
import type { Moves } from "../../types/global"
import "./battleBoard.scss"

interface BattleBoardProps {
  playerName?: string
  disabled: boolean
  handleMove: (move: string) => void
}

export const BattleBoard = ({
  playerName,
  disabled,
  handleMove
}: BattleBoardProps) => {
  const images = { rock, paper, scissors }

  return (
    <div className="battleBoard-container">
      <h1>{playerName}</h1>
      <div className="battleButtons-container">
        {Object.keys(images).map(move => (
          <button
            key={move}
            disabled={disabled}
            onClick={() => handleMove(move)}
          >
            <img src={images[move as Moves]} alt={move} />
          </button>
        ))}
      </div>
    </div>
  )
}
