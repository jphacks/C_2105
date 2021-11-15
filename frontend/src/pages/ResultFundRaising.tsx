import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { ResultItem } from '../components/ResultItem'
import { useDonatedProject } from '../hooks/useDonatedProject'
import { useEstimateNumberOfPeople } from '../hooks/useEstimateNumberOfPeople'

export const ResultFundRaising: FC = () => {
  const history = useHistory()
  const [topPageButton, setTopPageButton] = useState(false)
  const project = useDonatedProject()
  const { inFront } = useEstimateNumberOfPeople()
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/')
    }, 60000)
    const topPageTimer = setTimeout(() => {
      setTopPageButton(true)
    }, 5000)
    return () => {
      inFront.current = false
      clearTimeout(timer)
      clearTimeout(topPageTimer)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {topPageButton && (
        <button
          className="btn btn-outline btn-accent absolute top-16 right-16"
          onClick={() => {
            history.push('/')
          }}
        >
          トップ画面へ
        </button>
      )}
      <div className="text-2xl stat-value">ありがとうございます。</div>
      <div className="text-2xl stat-value mb-4">
        「{project?.title}」{project.id === 0 ? 'で' : 'に'}
        {project?.earnedValue}円募金しました。
      </div>
      {<ResultItem project={project} />}
    </>
  )
}
