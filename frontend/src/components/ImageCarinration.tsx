import { FC } from 'react'

type props = {
  top: number
  left: number
  len: number
  image: string | undefined
}

export const ImageCaribration: FC<props> = ({ top, left, len, image }) => {
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${len}px`,
    height: `${len}px`,
  }

  return (
    <>
      <div className="relative" style={{ width: '640px', height: '360px' }}>
        <img src={image} className="absolute top-0 left-0" />
        <div style={style} className="absolute border-4" />
      </div>
    </>
  )
}
