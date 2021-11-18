import { FC, useEffect, useState } from 'react'
import { ImageCaribration } from '../components/ImageCarinration'
import { FixParams } from '../components/FixParams'

export const CaliblationImg: FC = () => {
  const [imageURL, setImageURL] = useState<string>()

  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const [video, setVideo] = useState<HTMLVideoElement>()

  const [timer, setTimer] = useState<NodeJS.Timer>()

  const [top, setTop] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [len, setLen] = useState<number>(100)

  //fps上げすぎるとsocket通信が落ちます
  const fps = 10

  useEffect(() => {
    if (video) {
      const interval = setInterval(() => {
        if (canvas) {
          canvas!.getContext('2d')!.drawImage(video!, 0, 0)
          setImageURL(canvas!.toDataURL('image/jpeg'))
        }
      }, 1000 / fps)
      setTimer(interval)
    }
  }, [video])

  useEffect(() => {
    const initCanvas = document.createElement('canvas')
    initCanvas.width = 640
    initCanvas.height = 360

    setCanvas(initCanvas)

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((mediaStream) => {
        const initVideo = document.createElement('video')
        initVideo.srcObject = mediaStream
        initVideo.autoplay = true
        setVideo(initVideo)
      })
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  const style = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${len}px`,
    height: `${len}px`,
  }

  return (
    <>
      <h1>calibration page</h1>
      <ImageCaribration left={left} top={top} image={imageURL} len={len} />
      <FixParams
        left={left}
        top={top}
        len={len}
        setLeft={setLeft}
        setTop={setTop}
        setLen={setLen}
        beforeUpdate={() => {
          if (timer) {
            clearInterval(timer)
          }
        }}
      />
    </>
  )
}
