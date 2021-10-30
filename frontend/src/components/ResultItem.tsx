import React, { FC } from 'react'
import { Project } from '../types/types'
import { EarnedValue } from './EarnedValue'
import QRCode from 'qrcode.react'
import { imgMap } from '../assets/index'
import { imgNamePicker } from '../lib/imgNamePicker'
type Props = {
  project: Project | null
}

export const ResultItem: FC<Props> = ({ project }) => {
  if (!project) {
    return <div>Error</div>
  }

  const qrUrl = process.env.REACT_APP_PJ! + `?no=${project.id}`

  return (
    <div className="grid grid-cols-5 grid-rows-4 gap-y-2 gap-x-4 border border-black w-11/12 h-96 rounded-lg p-2">
      <img
        className="col-span-2 bg-gray-300 rounded-lg row-span-4 border border-black self-center w-full h-80"
        src={
          project.imgUrl
            ? //@ts-expect-error 仮置き
              imgMap[imgNamePicker(project.imgUrl)]
            : imgMap['noImage']
        }
        // src={imgMap['noImage']}
      />
      <div className="font-bold row-span-1 col-span-2 text-xl self-center">
        {project.title}
      </div>
      <div className="row-span-3 col-span-1 justify-self-center self-center">
        <div className="mb-4 text-center">
          詳しいプロジェクトの状況をWebでチェック！
        </div>
        <QRCode value={qrUrl} className="mx-auto" />
      </div>
      <div className="row-span-2 col-span-2 overflow-y-scroll w-full">
        {project.explanation}
      </div>
      <div className="font-bold row-span-1 col-span-3 self-center w-full">
        <EarnedValue {...project} result />
      </div>
    </div>
  )
}
