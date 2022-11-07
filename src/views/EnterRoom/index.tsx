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
      setErrorMsg('Escreva um nome com pelo menos 3 caracteres')
      return
    }

    if (name.length >= 16) {
      setErrorMsg('Escreva um nome com menos de 15 caracteres')
      return
    }

    setSocket?.(
      io(
        process.env.REACT_APP_API_URL ??
          'https://jokenpo-battle-back-end.herokuapp.com/'
      ).emit('player_connect', name)
    )

    setView?.('Lobby')
  }

  return (
    <div className="enterRoom-container">
      <input type="text" ref={nameRef} placeholder="Nome" autocomplete="cc-csc" />
      <button onClick={handleConnect}>Entrar</button>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  )
}
