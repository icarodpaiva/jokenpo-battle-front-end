import { useSocketContext } from '../../contexts/SocketContext'
import './statistics.scss'

export const Statistics = () => {
  const { statistics, setView } = useSocketContext()

  if (!statistics || statistics.length <= 0) {
    return <h1>Sem dados</h1>
  }

  return (
    <div className="statistics-container">
      <h1>Estatísticas</h1>

      <table cellSpacing={0} className="table-statistics">
        <thead>
          <tr className="row-titles">
            <th className="title-player">Jogador</th>
            <th className="title-quantity">Qtd. de partidas jogadas</th>
            <th className="title-victories">Vitórias</th>
            <th className="title-defeats">Derrotas</th>
            <th className="title-draw">Empates</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map(({ id, name, matches, win, loose, draw }) => (
            <tr key={id}>
              <td className="content-player">{name}</td>
              <td className="content-quantity">{matches}</td>
              <td className="content-victories">{win}</td>
              <td className="content-defeats">{loose}</td>
              <td className="content-draw">{draw}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="buttons-container">
        <button
          style={{ marginTop: 20, padding: 5 }}
          onClick={() => window.location.reload()}
          className="closeGame-button"
        >
          Fechar o jogo
        </button>

        <button
          style={{ marginTop: 20, padding: 5 }}
          onClick={() => setView?.('Tournment')}
          className="back-button"
        >
          Voltar para as Chaves de Torneio
        </button>
      </p>
    </div>
  )
}
