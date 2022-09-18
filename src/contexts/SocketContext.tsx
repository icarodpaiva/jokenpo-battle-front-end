import React, { createContext, useContext, useState } from "react"
import type { Socket } from "socket.io-client"
import { AllPlayers, TourmentBrackets } from "../types/Players"
import { View } from "../types/View"

interface SocketContextProps {
  children?: React.ReactNode
  view?: View
  setView?: (view: View) => void
  socket?: Socket
  setSocket?: (socket: Socket) => void
  allPlayers?: AllPlayers[]
  tournmentBrackets?: TourmentBrackets[][]
}

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [view, setView] = useState<View>("EnterRoom")
  const [allPlayers, setAllPlayers] = useState<AllPlayers[]>([])
  const [tournmentBrackets, setTournmentBrackets] = useState<
    TourmentBrackets[][]
  >([])
  const [socket, setSocket] = useState<Socket | undefined>()

  socket?.on("players", players => setAllPlayers(players))

  socket?.on("tournment_brackets", brackets => {
    setTournmentBrackets(brackets)

    // change view for all players
    setView("Tournment")
  })

  return (
    <SocketContext.Provider
      value={{
        view,
        setView,
        socket,
        setSocket,
        allPlayers,
        tournmentBrackets
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
