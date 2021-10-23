import React, { FC } from 'react'
import { Project } from '../types/types'

type Props = { project: Project }

export const FundRasingItem: FC<Props> = ({ project }) => {
  return (
    <div className="grid grid-cols-3 border border-black w-96 h-32">
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
        <div className="font-bold row-span-1 h-3">達成状況</div>
      </div>
    </div>
  )
}
