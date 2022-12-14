import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Socket } from "socket.io-client"
import {
  Player,
  BattlePlayers,
  BattleMoves,
  BattleSituation,
  BattleDetails,
  Statistics
} from "../types/global"
import { View } from "../types/View"

interface SocketContextProps {
  children?: ReactNode
  view?: View
  setView?: (view: View) => void
  socket?: Socket
  setSocket?: (socket: Socket) => void
  idPlayer?: string
  playersList?: Player[]
  tournmentBrackets?: Player[][]
  battlePlayers?: BattlePlayers
  setBattlePlayers?: (battlePlayers?: BattlePlayers) => void
  battleMoves?: BattleMoves
  setBattleMoves?: (battleMoves?: BattleMoves) => void
  battleSituation?: BattleSituation
  setBattleSituation?: (battleSituation?: BattleSituation) => void
  champion?: Player
  statistics?: Statistics[]
}

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [view, setView] = useState<View>("EnterRoom")
  const [socket, setSocket] = useState<Socket | undefined>()
  const [playersList, setPlayersList] = useState<Player[]>([])
  const [tournmentBrackets, setTournmentBrackets] = useState<Player[][]>([])
  const [battlePlayers, setBattlePlayers] = useState<BattlePlayers>()
  const [battleMoves, setBattleMoves] = useState<BattleMoves>()
  const [battleSituation, setBattleSituation] = useState<BattleSituation>()
  const [champion, setChampion] = useState<Player>()
  const [statistics, setStatistics] = useState<Statistics[]>([])

  const idPlayer = socket?.id

  useEffect(() => {
    socket?.on("players", (players: Player[]) => setPlayersList(players))

    socket?.on("tournment_start", () => setView("Tournment"))

    socket?.on("tournment_brackets", (brackets: Player[][]) =>
      setTournmentBrackets(brackets)
    )

    let timerToNextBattle: NodeJS.Timeout
    socket?.on("battle_players", (battle_players: BattlePlayers) => {
      timerToNextBattle = setTimeout(() => {
        if (!battle_players.player2?.id) {
          socket?.emit("next_battle")
          return
        }

        setBattlePlayers(battle_players)
        setView("Battle")
      }, 5000)
    })

    let timerToChangeView: NodeJS.Timeout
    socket?.on(
      "battle_details",
      ({ battle_moves, battle_situation }: BattleDetails) => {
        setBattleMoves(battle_moves)
        setBattleSituation(battle_situation)

        if (battle_situation.winner && battle_situation.looser) {
          timerToChangeView = setTimeout(() => setView("Tournment"), 6500)
        }
      }
    )

    socket?.on("champion", (game_champion: Player) =>
      setChampion(game_champion)
    )

    socket?.on("statistics", (game_statistics: Statistics[]) =>
      setStatistics(game_statistics)
    )

    return () => {
      socket?.off("players")
      socket?.off("tournment_start")
      socket?.off("tournment_brackets")
      socket?.off("battle_players", () => clearTimeout(timerToNextBattle))
      socket?.off("battle_details", () => clearTimeout(timerToChangeView))
      socket?.off("champion")
      socket?.off("statistics")
    }
  })

  return (
    <SocketContext.Provider
      value={{
        view,
        setView,
        socket,
        setSocket,
        idPlayer,
        playersList,
        tournmentBrackets,
        battlePlayers,
        setBattlePlayers,
        battleMoves,
        setBattleMoves,
        battleSituation,
        setBattleSituation,
        champion,
        statistics
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider")
  }

  return context
}
