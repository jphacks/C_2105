import React, { FC } from 'react'
import { Project } from '../types/types'
import { EarnedValue } from './EarnedValue'
import { useHistory } from 'react-router-dom'
type Props = { project: Project }

export const FundRasingItem: FC<Props> = ({ project }) => {
  const history = useHistory()
  return (
    <div
      className="grid grid-cols-3 border border-black w-96 h-32"
      onClick={() => {
        history.push(`${project.id}/loading`)
      }}
    >
      <div className="col-span-1 bg-gray-300">ここ画像</div>
      <div className="col-span-2 grid-rows-4 justify-center">
        <div className="font-bold row-span-1 h-10 overflow-y-scroll">
          {project.title}
        </div>
        {/* 多分伸ばせるようにしたほうがいいかも or modalとか挟んでも良さそう */}
        <div className="row-span-2 overflow-y-scroll h-16">
          {project.explanation}
        </div>
        {/* <div className="font-bold row-span-1">説明</div> */}
        <div className="font-bold row-span-1 h-2">
          <EarnedValue EarnedValue={project.Progress} />
        </div>
      </div>
    </div>
  )
}
