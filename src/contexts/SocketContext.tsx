import React, { createContext, useContext, useState, useEffect } from "react"
import type { Socket } from "socket.io-client"
import {
  Players,
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
  playersList?: Players[]
  tournmentBrackets?: TourmentBrackets[][]
  battlePlayers?: BattlePlayers
  battleMoves?: BattleMoves
  setBattleMoves?: (battleMoves?: BattleMoves) => void
  battleSituation?: BattleSituation
  setBattleSituation?: (battleSituation?: BattleSituation) => void
}

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [view, setView] = useState<View>("EnterRoom")
  const [socket, setSocket] = useState<Socket | undefined>()
  const [playersList, setPlayersList] = useState<Players[]>([])
  const [tournmentBrackets, setTournmentBrackets] = useState<
    TourmentBrackets[][]
  >([])
  const [battlePlayers, setBattlePlayers] = useState<BattlePlayers>()
  const [battleMoves, setBattleMoves] = useState<BattleMoves>()
  const [battleSituation, setBattleSituation] = useState<BattleSituation>()

  const idPlayer = socket?.id

  useEffect(() => {
    socket?.on("players", (players: Players[]) => setPlayersList(players))

    socket?.on("tournment_brackets", (brackets: TourmentBrackets[][]) => {
      if (view === "Lobby") {
        setView("Tournment")
      } else {
        setTimeout(() => {
          setView("Tournment")
        }, 5000)
      }
      setTournmentBrackets(brackets)
    })

    socket?.on("battle_players", (battle_players: BattlePlayers) => {
      setBattlePlayers(battle_players)
      setView("Battle")
    })

    socket?.on(
      "battle_details",
      ({ battle_moves, battle_situation }: BattleDetails) => {
        setBattleMoves(battle_moves)
        setBattleSituation(battle_situation)
      }
    )

    return () => {
      socket?.off("players")
      socket?.off("tournment_brackets")
      socket?.off("battle_players")
      socket?.off("battle_details")
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
        battleMoves,
        setBattleMoves,
        battleSituation,
        setBattleSituation
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
