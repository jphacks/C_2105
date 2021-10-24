import { FC } from 'react'
import { ResultItem } from '../components/ResultItem'
import { useProjectContext } from '../context/ProjectProvider'
type Props = {}

export const ResultFundRaising: FC<Props> = () => {
  //選択したPJ Contextで持っておいて、＋Arduino側からもらった金額を足して表示
  const { project } = useProjectContext()

  return (
    <>
      <div>ありがとうございます。</div>
      <div>
        「{project?.title}」に{project?.earnedValue}円募金しました
      </div>
      <ResultItem project={project} />
    </>
  )
}
