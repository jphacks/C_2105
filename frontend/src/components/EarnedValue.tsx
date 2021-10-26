import { FC } from 'react'
import { Project } from '../types/types'

type Props = Pick<Project, 'earnedValue' | 'targetAmount' | 'progress'>

export const EarnedValue: FC<Props> = ({
  earnedValue,
  targetAmount,
  progress,
}) => {
  //プロジェクトごとの金額取得APIが必要そう
  console.log(earnedValue, targetAmount)
  if (!progress || !targetAmount) {
    return <></>
  }
  return (
    <div className="flex items-center space-x-24">
      <div>達成状況</div>
      {/* <div className="border-2 border-black rounded-full w-32">
        <div className={progressStyle} style={{ width: `${per}%` }}>
          ￥{progress.toLocaleString()}
        </div> */}
      {/* </div> */}
      <div className="relative">
        <progress
          className="progress progress-accent opacity-50 w-32 h-4"
          value={`${progress}`}
          max={`${targetAmount}`}
        ></progress>
        <div className="text-xs absolute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          ￥{progress.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
