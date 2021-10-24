import { FC, memo } from 'react'
import { Project } from '../types/types'
import { EarnedValue } from './EarnedValue'
type Props = { project: Project; changeProject: (project: Project) => void }

const FundRasingItem: FC<Props> = ({ project, changeProject }) => {
  return (
    <div
      className="grid grid-cols-3 grid-rows-4 gap-2 border border-black max-w-md h-36 bg-white rounded-lg p-2"
      onClick={() => {
        changeProject({ ...project })
      }}
    >
      <div className="col-span-1 bg-gray-300 rounded-lg row-span-4">
        ここ画像
      </div>
      <div className="font-bold row-span-1 col-span-2 truncate">
        {project.title}
      </div>
      <div className="row-span-2 col-span-2 overflow-y-scroll">
        {project.explanation}
      </div>
      <div className="font-bold row-span-1 col-span-2 self-center">
        <EarnedValue EarnedValue={project.Progress} />
      </div>
    </div>
  )
}

export const FundRasingMemoItem = memo(FundRasingItem)
