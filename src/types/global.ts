export interface Players {
  id: string
  name: string
  winner: boolean | null
}

export interface BattlePlayers {
  player1: Players
  player2?: Players
}

export interface BattleMoves {
  player1: string
  player2: string
}

export interface BattleSituation {
  winner: Players | null
  looser: Players | null
}

export interface BattleDetails {
  battle_moves: BattleMoves
  battle_situation: BattleSituation
}
