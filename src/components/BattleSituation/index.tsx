import rockWinner from "../../assets/images/battle-situation/rock.png"
import paperWinner from "../../assets/images/battle-situation/paper.png"
import scissorsWinner from "../../assets/images/battle-situation/scissors.png"
import rock from "../../assets/images/board/rock.png"
import paper from "../../assets/images/board/paper.png"
import scissors from "../../assets/images/board/scissors.png"
import type { BattleSituation as BattleSituationType } from "../../types/global"
import "./battleSituation.scss"

interface BattleSituationProps {
  battleSituation?: BattleSituationType
}

export const BattleSituation = ({ battleSituation }: BattleSituationProps) => {
  const imagesWinner = {
    rock: rockWinner,
    paper: paperWinner,
    scissors: scissorsWinner
  }

  const images = { rock, paper, scissors }

  return (
    <div className="battleSituation-container">
      {battleSituation?.winner?.move && (
        <>
          <img src={imagesWinner[battleSituation.winner.move]} alt="paper" />
          <p>{battleSituation.winner.name} venceu</p>
        </>
      )}

      {battleSituation?.draw?.move && (
        <>
          <img src={images[battleSituation.draw.move]} alt="paper" />

          <p>EMPATE</p>
          <p>haverá uma nova batalha</p>

          <img src={images[battleSituation.draw.move]} alt="paper" />
        </>
      )}
    </div>
  )
}
