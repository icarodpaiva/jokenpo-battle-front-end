import { useEffect, useRef, useState } from "react"
import rock from "../../assets/images/battle/rock.gif"
import paper from "../../assets/images/battle/paper.gif"
import scissors from "../../assets/images/battle/scissors.gif"
import pow from "../../assets/images/battle/pow.png"
import type { BattleMoves as BattleMovesType } from "../../types/global"
import "./battleMoves.scss"

interface BattleMovesProps {
  battleMoves: BattleMovesType
}

export const BattleMoves = ({ battleMoves }: BattleMovesProps) => {
  const [showPow, setShowPow] = useState(false)
  const img1Ref = useRef<HTMLImageElement | null>(null)
  const img2Ref = useRef<HTMLImageElement | null>(null)
  const imgPowRef = useRef<HTMLImageElement | null>(null)

  const images = {
    rock,
    paper,
    scissors
  }

  useEffect(() => {
    img1Ref.current?.animate(
      [
        { marginLeft: 0 },
        { marginLeft: `calc(50% - ${img1Ref.current.offsetWidth}px)` }
      ],
      {
        duration: 2000,
        fill: "forwards"
      }
    )

    img2Ref.current?.animate(
      [
        { marginRight: 0 },
        { marginRight: `calc(50% - ${img2Ref.current.offsetWidth}px)` }
      ],
      {
        duration: 2000,
        fill: "forwards"
      }
    )

    const delayPow = setTimeout(() => {
      setShowPow(true)
    }, 2000)

    return () => clearTimeout(delayPow)
  }, [])

  useEffect(() => {
    if (imgPowRef.current && img1Ref.current) {
      imgPowRef.current.style.right = `calc(50% - ${
        img1Ref.current.offsetWidth / 2
      }px)`
    }
  }, [showPow])

  return (
    <div className="battleMoves-container">
      <img
        style={{ transform: "scaleX(-1)" }}
        src={images[battleMoves.player1]}
        alt={battleMoves?.player1}
        ref={img1Ref}
      />
      {showPow && (
        <img src={pow} alt="pow" className="pow-image" ref={imgPowRef} />
      )}
      <img
        src={images[battleMoves.player2]}
        alt={battleMoves?.player2}
        ref={img2Ref}
      />
    </div>
  )
}
