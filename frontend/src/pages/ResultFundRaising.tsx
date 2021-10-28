import { FC } from 'react'
import { useLocation } from 'react-router'
import { ResultItem } from '../components/ResultItem'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'

export const ResultFundRaising: FC = () => {
  //選択したPJ Contextで持っておいて、＋Arduino側からもらった金額を足して表示
  const { project } = useProjectContext()
  const { state } = useLocation<Project>()
  const autoProject = {
    ...project,
    explanation: state.title + 'に募金されました。',
  }

  return (
    <>
      <div className="text-2xl stat-value">ありがとうございます。</div>
      <div className="text-2xl stat-value mb-4">
        「{project?.title}」に{project?.earnedValue}円募金しました
      </div>
      <ResultItem project={project.id === 0 ? autoProject : project} />
    </>
  )
}
