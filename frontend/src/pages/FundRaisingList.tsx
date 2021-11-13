import { FC, useEffect } from 'react'
import { FundRasingMemoItems } from '../components/FundRaisingItems'
import { useHistory } from 'react-router-dom'
import { useProjectContext } from '../context/ProjectProvider'
import { useQueryProjects } from '../hooks/useQueryProject'
import { Loading } from '../components/Loading'
import { useMutateProject } from '../hooks/useMutateProject'
import { useSocketRef } from '../hooks/useSocketRef'

let earnedValue = 0
export const FundRaisingList: FC = () => {
  const history = useHistory()
  const { project: selectedProject } = useProjectContext()
  const { status, data } = useQueryProjects()
  const { updateProjectMutation } = useMutateProject()
  const { socketRef } = useSocketRef()
  useEffect(() => {
    if (socketRef.current !== undefined) {
      socketRef.current.on('donated', (data) => {
        earnedValue = Number(Object.keys(data)[0]) * data[Object.keys(data)[0]]
        updateProjectMutation.mutate(earnedValue)
        history.push(`/${selectedProject.id}/result`)
      })
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
