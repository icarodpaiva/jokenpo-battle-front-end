import { useRef, useState } from 'react'
import { useSocketContext } from '../../contexts/SocketContext'
import { io } from 'socket.io-client'
import './enterRoom.scss'

export const EnterRoom = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const nameRef = useRef<HTMLInputElement | null>(null)
  const { setView, setSocket, idPlayer } = useSocketContext()

  const handleConnect = () => {
    // prevent double connect
    if (idPlayer) {
      return
    }

    const name = nameRef.current?.value

    if (!name || name.length <= 2) {
      setErrorMsg('Please, write a nickname with 3 characteres or more')
      return
    }

    setSocket?.(
      io(process.env.REACT_APP_API_URL ?? 'http://localhost:3000').emit(
        'player_connect',
        name
      )
    )

    setView?.('Lobby')
  }

  return (
    <div className="container-enterRoom">
      <input type="text" ref={nameRef} />
      <button onClick={handleConnect}>Entrar</button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  )
}
