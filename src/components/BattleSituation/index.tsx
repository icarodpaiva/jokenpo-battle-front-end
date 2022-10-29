import rock from "../../assets/images/battle-situation/rock.png"
import paper from "../../assets/images/battle-situation/paper.png"
import scissors from "../../assets/images/battle-situation/scissors.png"
import type { BattleSituation as BattleSituationType } from "../../types/global"
import "./battleSituation.scss"

interface BattleSituationProps {
  battleSituation?: BattleSituationType
}

export const BattleSituation = ({ battleSituation }: BattleSituationProps) => {
  const images = { rock, paper, scissors }

  return (
    <div className="battleSituation-container">
      {battleSituation?.winner?.name && (
        <>
          <img
            src={images[battleSituation.winner.move ?? "scissors"]}
            alt="paper"
          />
          <p>{battleSituation.winner.name} venceu</p>
        </>
      )}

      {battleSituation?.draw && (
        <>
          <img
            src={images[battleSituation.draw.move ?? "scissors"]}
            alt="paper"
          />

          <p>EMPATE</p>
          <p>haverá uma nova batalha</p>

          <img
            src={images[battleSituation.draw.move ?? "scissors"]}
            alt="paper"
          />
        </>
      )}
    </div>
  )
}
