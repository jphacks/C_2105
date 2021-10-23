import React, { FC } from 'react'
import { FundRasingItems } from '../components/FundRaisingItems'

type Props = {}

export const FundRaisingList: FC<Props> = () => {
  return (
    <>
      <h1>スマート貯金箱</h1>
      <div>募金したいプロジェクトを選んで、コインを入れてください</div>
      <FundRasingItems />
    </>
  )
}
