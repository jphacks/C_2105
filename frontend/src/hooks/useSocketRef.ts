import { io, Socket } from 'socket.io-client'
import { useRef, useEffect } from 'react'
const ENDPOINT = process.env.REACT_APP_ARDUINO_ENDPOINT
export const useSocketRef = () => {
  const socketRef = useRef<Socket>()

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(ENDPOINT!, { transports: ['websocket'] })
    }
    return () => {
      console.log('disconnect')
      socketRef.current?.disconnect()
    }
  }, [])

  return {
    socketRef,
  }
}
