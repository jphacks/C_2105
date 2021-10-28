import { FC } from 'react'
import { Project } from '../types/types'

type Props = Pick<Project, 'earnedValue' | 'targetAmount' | 'progress'> & {
  result?: boolean
}

export const EarnedValue: FC<Props> = ({
  earnedValue,
  targetAmount,
  progress,
  result,
}) => {
  //プロジェクトごとの金額取得APIが必要そう
  if (!progress || !targetAmount) {
    return <></>
  }
  const isAchieved = progress >= targetAmount ? true : false

  const progressStyle = result ? 'h-8 w-80' : 'h-4 w-32'
  const textStyle = result ? 'text-xl' : ''
  return (
    <div className="flex items-center space-x-24">
      <div className={`label-text ${textStyle}`}>達成状況</div>
      {isAchieved ? (
        <div className="flex items-center space-x-4">
          <div className="card bordered">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className={`label-text ${textStyle}`}>Achieved!</span>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
          </div>
          {result && (
            <div className="text-xl">￥{progress.toLocaleString()}</div>
          )}
        </div>
      ) : (
        <div className="relative flex items-center">
          <progress
            className={`progress progress-accent w-32 ${progressStyle} z-10`}
            value={`${progress}`}
            max={`${targetAmount}`}
          ></progress>
          {earnedValue && (
            <>
              <div className="text-info absolute -top-5 left-1/2 transform -translate-x-1/5 text-xs animate-bounce">
                +￥{earnedValue}
              </div>
              <progress
                className={`progress progress-info opacity-60 w-32 ${progressStyle} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                value={`${progress + earnedValue}`}
                max={`${targetAmount}`}
              ></progress>
            </>
          )}
          <div className="text-xs absolute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            ￥{progress.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  )
}
