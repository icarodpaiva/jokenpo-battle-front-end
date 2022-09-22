export interface PlayersList {
  id: string
  name: string
}

export interface TourmentBrackets {
  id?: string
  name?: string
  winner?: boolean | null
}

export interface BattlePlayers {
  player1: TourmentBrackets
  player2: TourmentBrackets
}

export interface BattleMoves {
  player1: string
  player2: string
}
