import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useProjectContext } from '../context/ProjectProvider'

export const LoadingOnFundraising: FC = () => {
  const history = useHistory()
  const { project: selectedProject } = useProjectContext()
  //TODO バックエンド側の金額配分API叩く処理
  setTimeout(() => history.push(`/${selectedProject!.id}/result`, 1000), 5000)
  return (
    <>
      <div>募金中...</div>
    </>
  )
}
