import { FC, useEffect } from 'react'
import { FundRasingMemoItems } from '../components/FundRaisingItems'
import socketIOClient from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useProjectContext } from '../context/ProjectProvider'
import { useQueryProjects } from '../hooks/useQueryProject'
import { Loading } from '../components/Loading'

const ENDPOINT = 'http://localhost:3001'
const earnedValue = 1000
export const FundRaisingList: FC = () => {
  const history = useHistory()
  const { project: selectedProject, setProject } = useProjectContext()
  const { status, data } = useQueryProjects()
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('donated', (data) => {
      console.log(data)
    })

    setProject({ ...selectedProject, earnedValue: earnedValue })
    return () => {
      socket.disconnect()
    }
    //選択後に無理矢理、earnedValueを上書きしている あんまりよろしくない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject?.id, earnedValue])
  if (status === 'loading' || !data) return <Loading />
  if (status === 'error') return <div>Error</div>
  return (
    <>
      <div className="stat-value text-4xl mt-16">スマート貯金箱</div>
      <div className="text-xl">受付中の募金一覧</div>
      <div className="w-24 h-2 bg-green-500 mb-8" />

      <FundRasingMemoItems projects={data} />
      <button
        onClick={() => history.push(`/${selectedProject.id}/loading`)}
        className="bg-gray-500 text-white w-16 h-16 mt-4"
      >
        仮遷移用ボタン
      </button>
    </>
  )
}
