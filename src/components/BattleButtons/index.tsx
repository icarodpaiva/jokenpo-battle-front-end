interface BattleButtonsProps {
  disabled: boolean
  handleMove: (move: string) => void
}

export const BattleButtons = ({ disabled, handleMove }: BattleButtonsProps) => {
  return (
    <div>
      <button disabled={disabled} onClick={() => handleMove('rock')}>
        Pedra
      </button>
      <button disabled={disabled} onClick={() => handleMove('paper')}>
        Papel
      </button>
      <button disabled={disabled} onClick={() => handleMove('scissors')}>
        Tesoura
      </button>
    </div>
  )
}
