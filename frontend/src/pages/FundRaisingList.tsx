import { FC, useEffect } from 'react'
import { FundRasingMemoItems } from '../components/FundRaisingItems'
import socketIOClient from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useProjectContext } from '../context/ProjectProvider'
import { useQueryProjects } from '../hooks/useQueryProject'
import { Loading } from '../components/Loading'
import { useMutateProject } from '../hooks/useMutateProject'

const ENDPOINT = process.env.REACT_APP_ARDUINO_ENDPOINT
let earnedValue = 0
export const FundRaisingList: FC = () => {
  // alert(ENDPOINT)
  const history = useHistory()
  const { project: selectedProject } = useProjectContext()
  const { status, data } = useQueryProjects()
  const { updateProjectMutation } = useMutateProject()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT!)
    if (socket !== undefined) {
      socket.on('donated', (data) => {
        earnedValue = Number(Object.keys(data)[0]) * data[Object.keys(data)[0]]
        updateProjectMutation.mutate(earnedValue)
        history.push(`/${selectedProject.id}/result`)
      })
    }

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
      <div className="stat-value text-4xl mt-16">スマート募金箱</div>
      <div className="text-xl">受付中の募金一覧</div>
      <div className="w-24 h-2 bg-green-500 mb-8" />

      <FundRasingMemoItems projects={data} />
    </>
  )
}
