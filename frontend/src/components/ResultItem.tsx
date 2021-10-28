import React, { FC } from 'react'
import { Project } from '../types/types'
import { EarnedValue } from './EarnedValue'
import QRCode from 'qrcode.react'

type Props = {
  project: Project | null
}

export const ResultItem: FC<Props> = ({ project }) => {
  if (!project) {
    return <div>Error</div>
  }
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2 border border-black w-11/12 h-96 rounded-lg p-2">
      <div className="col-span-1 bg-gray-300 rounded-lg row-span-4">
        ここ画像
      </div>
      <div className="font-bold row-span-1 col-span-1">{project.title}</div>
      <div className="row-span-3 col-span-1 justify-self-center self-center">
        <div>詳しいプロジェクトの状況をWebでチェック！</div>
        <QRCode value="https://google.com" className="mx-auto" />
      </div>
      <div className="row-span-2 col-span-1 overflow-y-hidden">
        {project.explanation}
      </div>
      <div className="font-bold row-span-1 col-span-2 self-center w-10/12">
        <EarnedValue {...project} />
      </div>
    </div>
  )
}
