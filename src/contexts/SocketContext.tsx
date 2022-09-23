import React, { createContext, useContext, useState } from "react"
import type { Socket } from "socket.io-client"
import {
  PlayersList,
  TourmentBrackets,
  BattlePlayers,
  BattleMoves,
  BattleSituation,
  BattleDetails
} from "../types/global"
import { View } from "../types/View"

interface SocketContextProps {
  children?: React.ReactNode
  view?: View
  setView?: (view: View) => void
  socket?: Socket
  setSocket?: (socket: Socket) => void
  idPlayer?: string
  playersList?: PlayersList[]
  tournmentBrackets?: TourmentBrackets[][]
  battlePlayers?: BattlePlayers
  battleMoves?: BattleMoves
  battleSituation?: BattleSituation
  setBattleSituation?: (battleSituation?: BattleSituation) => void
}

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [view, setView] = useState<View>("EnterRoom")
  const [socket, setSocket] = useState<Socket | undefined>()
  const [playersList, setPlayersList] = useState<PlayersList[]>([])
  const [tournmentBrackets, setTournmentBrackets] = useState<
    TourmentBrackets[][]
  >([])
  const [battlePlayers, setBattlePlayers] = useState<BattlePlayers>()
  const [battleMoves, setBattleMoves] = useState<BattleMoves>()
  const [battleSituation, setBattleSituation] = useState<BattleSituation>()

  const idPlayer = socket?.id

  socket?.on("players", players => setPlayersList(players))

  socket?.on("tournment_brackets", brackets => {
    setTournmentBrackets(brackets)
    setView("Tournment")
  })

  socket?.on("battle_players", battle_players => {
    setBattlePlayers(battle_players)
    setView("Battle")
  })

  socket?.on(
    "battle_details",
    ({ battle_moves, battle_situation }: BattleDetails) => {
      setBattleMoves(battle_moves)
      setBattleSituation(battle_situation)
      console.log({ battle_moves, battle_situation })
    }
  )

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
        battleMoves,
        battleSituation
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
