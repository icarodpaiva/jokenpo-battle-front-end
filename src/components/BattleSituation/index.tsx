import type { BattleSituation as BattleSituationType } from "../../types/global"
import type { Images } from "../BattleBoard"
import "./battleSituation.scss"

interface BattleSituationProps {
  battleSituation?: BattleSituationType
  images: Images
}

export const BattleSituation = ({
  battleSituation,
  images
}: BattleSituationProps) => {
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
