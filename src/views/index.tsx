import { useSocketContext } from "../contexts/SocketContext"
import { EnterRoom } from "./EnterRoom"
import { Lobby } from "./Lobby"
import { Tournment } from "./Tournment"
import { Battle } from "./Battle"
import { Statistics } from "./Statistics"

export const ViewsContainer = () => {
  const { view } = useSocketContext()

  return (
    <div className="main-container">
      {view === "EnterRoom" && <EnterRoom />}
      {view === "Lobby" && <Lobby />}
      {view === "Tournment" && <Tournment />}
      {view === "Battle" && <Battle />}
      {view === "Statistics" && <Statistics />}
    </div>
  )
}
