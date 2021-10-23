import { FC } from 'react'

type Props = {
  EarnedValue?: number
}
//いい感じに達成度のcss調整するの大変そう（？）だったので一応切り分けてある
export const EarnedValue: FC<Props> = ({ EarnedValue }) => {
  //プロジェクトごとの金額取得APIが必要そう

  if (!EarnedValue) {
    return <></>
  }
  return (
    <div className="flex justify-between">
      <div>達成状況</div>
      <div className="border border-black rounded-full w-32">
        ￥{EarnedValue.toLocaleString()}
      </div>
    </div>
  )
}
