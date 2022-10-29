export interface Player {
  id: string
  name: string
  winner?: boolean
  disconnected?: boolean
}

export interface BattlePlayers {
  player1: Player
  player2?: Player
}

export type Moves = "rock" | "paper" | "scissors"

export interface BattleMoves {
  player1: Moves
  player2: Moves
}

export interface BattleSituation {
  winner?: Player & { move?: Moves }
  looser?: Player & { move?: Moves }
  draw?: {
    draw: boolean
    move: Moves
  }
}

export interface BattleDetails {
  battle_moves: BattleMoves
  battle_situation: BattleSituation
}

export interface Statistics {
  id: string
  name: string
  matches: number
  win: number
  loose: number
  draw: number
}
