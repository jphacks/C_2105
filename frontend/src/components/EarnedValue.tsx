import { useEffect, FC } from 'react'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:3001'

export const EarnedValue: FC = () => {
  const socket = socketIOClient(ENDPOINT)
  if (socket !== undefined) {
    //ソケットを通してset_nicknameイベントを発火する
    socket.emit('test')
  }
  return <div>達成状況</div>
}
