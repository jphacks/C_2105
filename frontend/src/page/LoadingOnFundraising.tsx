import React, { FC, useEffect } from 'react'
import { FundRasingItems } from '../components/FundRaisingItems'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:3001'
type Props = {}

export const LoadingOnFundraising: FC<Props> = () => {
  //開発時はエラーログウザイのでsocket止める

  //   TODO hooksに切り分ける　arduino側から金額の情報を受け取る
  //   const socket = socketIOClient(ENDPOINT)
  //   if (socket !== undefined) {
  //     socket.emit('test')
  //   }

  return (
    <>
      <div>募金中...</div>
    </>
  )
}
