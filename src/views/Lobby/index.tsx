import { useSocketContext } from '../../contexts/SocketContext'
import './lobby.scss'

export const Lobby = () => {
  const { playersList, idPlayer, socket } = useSocketContext()

  if (!playersList || playersList.length <= 0) {
    return <h3>Carregando...</h3>
  }

  const isLeader = playersList[0].id === idPlayer

  return (
    <div className="lobby-container">
      <h1>Jogadores: {playersList?.length ?? 0}</h1>

      {playersList?.map(({ id, name }) => (
        <h2 key={id}>{name}</h2>
      ))}

      {isLeader && (
        <button
          onClick={() => socket?.emit('tournment_start')}
          className="start-button"
        >
          Iniciar batalha
        </button>
      )}
      <button onClick={() => window.location.reload()} className="back-button">
        Voltar
      </button>
    </div>
  )
}
