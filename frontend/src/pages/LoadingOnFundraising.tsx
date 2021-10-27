import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Gallery } from '../components/Gallery'
import { useProjectContext } from '../context/ProjectProvider'

export const LoadingOnFundraising: FC = () => {
  const history = useHistory()
  const { project: selectedProject } = useProjectContext()
  //TODO バックエンド側の金額配分API叩く処理
  setTimeout(() => history.push(`/${selectedProject.id}/result`, 1000), 5000)
  return (
    <>
      <button className="btn btn-sm btn-ghost loading text-3xl absolute top-24">
        募金中...
      </button>
      <Gallery />
    </>
  )
}
