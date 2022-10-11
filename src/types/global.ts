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

export interface BattleMoves {
  player1: string
  player2: string
}

export interface BattleSituation {
  winner?: Player
  looser?: Player
  draw?: boolean
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
