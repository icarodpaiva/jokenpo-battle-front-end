import { useSocketContext } from '../../contexts/SocketContext'
import './lobby.scss'

export const Lobby = () => {
  const { playersList, idPlayer, socket } = useSocketContext()

  if (!playersList || playersList.length <= 0) {
    return <div className="loading"></div>
  }

  const isLeader = playersList[0].id === idPlayer

  return (
    <div className="lobby-container">
      <div className="playersQuantity-container">
        <h1>Jogadores: {playersList?.length ?? 0}</h1>
      </div>

      <div className="names-container">
        {playersList?.map(({ id, name }) => (
          <h2 key={id}>{name}</h2>
        ))}
      </div>

      <div className="buttons-container">
        <button
          onClick={() => window.location.reload()}
          className="back-button"
        >
          Voltar
        </button>
        {isLeader && (
          <button
            onClick={() => socket?.emit('tournment_start')}
            className="start-button"
          >
            Iniciar batalha
          </button>
        )}
      </div>
    </div>
  )
}
