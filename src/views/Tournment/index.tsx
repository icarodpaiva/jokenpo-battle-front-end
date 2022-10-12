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
    return <h1>Carregando...</h1>
  }
  return (
    <div className="tournment-container">
      <h1>Chaves de torneio: </h1>

      <div
        className="brackets-container"
        style={{
          gridTemplateColumns: `repeat(${tournmentBrackets.length}, 1fr)`
        }}
      >
        {tournmentBrackets?.map(brackets => (
          <ul key={uuidv4()}>
            {brackets.map(({ name, disconnected, winner }) => (
              <li
                key={uuidv4()}
                className={`${
                  brackets.length === 1 && name
                    ? "champion"
                    : disconnected
                    ? "disconnected"
                    : winner
                    ? "winner"
                    : winner === false
                    ? "looser"
                    : undefined
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>

      {champion?.name && (
        <>
          <p style={{ padding: 20, background: "pink" }}>
            <strong color="white">The champion is {champion.name}</strong>
          </p>

          <p>
            <button
              style={{ padding: 5 }}
              onClick={() => window.location.reload()}
            >
              Close Game
            </button>

            <button
              style={{ padding: 5 }}
              onClick={() => setView?.("Statistics")}
            >
              Go to statistics
            </button>
          </p>
        </>
      )}
    </div>
  )
}
