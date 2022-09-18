import React, { createContext, useContext, useState } from "react"
import type { Socket } from "socket.io-client"
import { AllPlayers } from "../types/Players"

interface SocketContextProps {
  children?: React.ReactNode
  socket?: Socket
  setSocket?: (socket: Socket) => void
  allPlayers?: AllPlayers[]
  setAllPlayers?: (allPlayers: AllPlayers[]) => void
}

const SocketContext = createContext<SocketContextProps | null>(null)

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [allPlayers, setAllPlayers] = useState<AllPlayers[]>([])
  const [socket, setSocket] = useState<Socket | undefined>()

  socket?.on("players", players => setAllPlayers(players))

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        allPlayers,
        setAllPlayers
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
