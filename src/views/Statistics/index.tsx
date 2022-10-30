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

      <table cellSpacing={0}>
        <colgroup>
          <col />
          <col style={{ background: 'aqua' }} />
          <col style={{ background: 'green' }} />
          <col style={{ background: 'red' }} />
          <col style={{ background: 'gray' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Qtd</th>
            <th>V</th>
            <th>D</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map(({ id, name, matches, win, loose, draw }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{matches}</td>
              <td>{win}</td>
              <td>{loose}</td>
              <td>{draw}</td>
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
