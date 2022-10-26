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
          {/* remove this mock later, when the backend return the player move */}
          <img src={images["paper"]} alt="paper" />
          <p>{battleSituation.winner.name} venceu</p>
        </>
      )}

      {battleSituation?.draw && (
        <>
          {/* remove this mock later, when the backend return the player move */}
          <img src={images["paper"]} alt="paper" />
          <p>EMPATE</p>
          <p>haverá uma nova batalha</p>
          {/* remove this mock later, when the backend return the player move */}
          <img src={images["paper"]} alt="paper" />
        </>
      )}
    </div>
  )
}
