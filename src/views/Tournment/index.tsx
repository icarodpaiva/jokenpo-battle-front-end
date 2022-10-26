import { useEffect } from "react"
import { useSocketContext } from "../../contexts/SocketContext"
import { v4 as uuidv4 } from "uuid"
import "./tournment.scss"

export const Tournment = () => {
  const { socket, tournmentBrackets, champion, setView } = useSocketContext()

  useEffect(() => {
    socket?.emit("next_battle")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!tournmentBrackets || tournmentBrackets.length <= 0) {
    return <div className="loading-tourmment"></div>
  }

  return (
    <div className="tournment-container">
      <div
        className="brackets-container"
        style={{
          gridTemplateColumns: `repeat(${tournmentBrackets.length}, 1fr)`
        }}
      >
        {tournmentBrackets?.map((_, index) => (
          <p key={index} className="brackets-phase">
            {index + 1}ª fase
          </p>
        ))}

        {tournmentBrackets?.map(brackets => (
          <ul key={uuidv4()}>
            {brackets.map(({ name, disconnected, winner }) => {
              const playerStatus =
                brackets.length === 1 && name
                  ? "champion"
                  : disconnected
                  ? "disconnected"
                  : winner
                  ? "winner"
                  : winner === false
                  ? "looser"
                  : ""

              return (
                <li key={uuidv4()} className={playerStatus ?? undefined}>
                  {name}
                </li>
              )
            })}
          </ul>
        ))}
      </div>

      {champion?.name && (
        <>
          <p className="champion-alert">
            O vencedor é <strong>{champion.name}</strong>
          </p>

          <div className="buttons-container">
            <button
              onClick={() => window.location.reload()}
              className="close-button"
            >
              Fechar jogo
            </button>

            <button
              onClick={() => setView?.("Statistics")}
              className="statistics-button"
            >
              Ir para estatísticas
            </button>
          </div>
        </>
      )}
    </div>
  )
}
