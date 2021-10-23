import React, { FC, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { useHistory, useParams } from 'react-router-dom'

const ENDPOINT = 'http://localhost:3001'
type ParamTypes = {
  projectId: string
}

export const LoadingOnFundraising: FC = () => {
  const history = useHistory()
  const { projectId } = useParams<ParamTypes>()
  //TODO hooksに切り分けてもよい　arduino側から金額の情報を受け取る->通信終了後、金額情報持たせてresultにpush
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    //金額もらえたかどうかの判定(今はとりあえず5秒後に1000円もらったことにしてる)
    setTimeout(() => history.push(`/${projectId}/result`, 1000), 5000)
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <div>募金中...</div>
    </>
  )
}
