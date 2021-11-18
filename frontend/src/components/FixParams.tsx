import { FC } from 'react'
import { useSocketRef } from '../hooks/useSocketRef'
import { useHistory } from 'react-router'

type props = {
  top: number
  left: number
  len: number
  setTop: (value: number) => void
  setLeft: (value: number) => void
  setLen: (value: number) => void
  beforeUpdate: () => void
}

export const FixParams: FC<props> = ({
  top,
  left,
  len,
  setTop,
  setLeft,
  setLen,
  beforeUpdate,
}) => {
  const { socketRef } = useSocketRef()
  const history = useHistory()

  const onClickSubmit = (e: any) => {
    e.preventDefault()
    beforeUpdate()
    socketRef.current?.emit('calibration', {
      top,
      bottom: top + len,
      left,
      right: left + len,
    })
    history.push('/')
  }

  return (
    <>
      <form className="table">
        <div className="table-row">
          <label htmlFor="top">top</label>
          <input
            type="number"
            value={top}
            id="top"
            className="border-2 text-right table-cell m-2"
            onChange={(e) => setTop(Number(e.target.value))}
          />
        </div>
        <div className="table-row">
          <label htmlFor="left">left</label>
          <input
            type="number"
            value={left}
            id="left"
            className="border-2 text-right table-cell m-2"
            onChange={(e) => setLeft(Number(e.target.value))}
          />
        </div>
        <div className="table-row">
          <label htmlFor="len">len</label>
          <input
            type="number"
            value={len}
            id="left"
            className="border-2 text-right table-cell m-2"
            onChange={(e) => setLen(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="calibration">calibration</label>
          <input
            type="submit"
            onClick={onClickSubmit}
            className="table-cell m-2 p-2"
          />
        </div>
      </form>
    </>
  )
}
