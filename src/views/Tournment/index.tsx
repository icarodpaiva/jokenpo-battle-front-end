import { useEffect } from "react"
import { useSocketContext } from "../../contexts/SocketContext"
import { v4 as uuidv4 } from "uuid"

export const Tournment = () => {
  const { socket, tournmentBrackets } = useSocketContext()

  useEffect(() => {
    socket?.emit("next_battle")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Tournment brackets: </h1>
      {tournmentBrackets?.map(brackets => (
        <div key={uuidv4()}>
          {brackets.map(player => (
            <p
              key={uuidv4()}
              style={{
                background:
                  player?.winner === true
                    ? "green"
                    : player?.winner === false
                    ? "red"
                    : undefined,
                border: "1px solid black",
                display: "inline-block",
                padding: "10px",
                minWidth: "60px",
                minHeight: "20px"
              }}
            >
              {player?.name}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
