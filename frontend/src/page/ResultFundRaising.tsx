import React, { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
type Props = {}

export const ResultFundRaising: FC<Props> = () => {
  //選択したPJ Contextで持っておいて、＋Arduino側からもらった金額を足して表示
  //Arduino側
  const { state } = useLocation()

  return (
    <>
      <div>ありがとうございました</div>
      <div>PJ名に{state}円募金しました</div>
    </>
  )
}
