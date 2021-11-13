import { useSocketRef } from './useSocketRef'
import { useEffect } from 'react'
import { useEstimateNumberOfPeople } from './useEstimateNumberOfPeople'

export const useGetImageCapture = async () => {
  const { socketRef } = useSocketRef()
  const { inFront, estimateNumberOfPeople } = useEstimateNumberOfPeople()
  const canvas = document.createElement('canvas')
  const video = document.createElement('video')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const fps = 10
  const loop = () => {
    setTimeout(async () => {
      requestAnimationFrame(loop)
      await canvas.getContext('2d')!.drawImage(video, 0, 0)
      const image = await canvas.toDataURL('image/jpeg')
      estimateNumberOfPeople(canvas)
      //一応人が目の前にいる時しか、imageを送らないようにしている。精度は微妙。
      if (inFront.current) {
        socketRef.current?.emit('image', { image: image })
      }
    }, 1000 / fps)
  }
  const getMedia = (mediaStream: MediaStream) => {
    video.autoplay = true
    video.srcObject = mediaStream
    video.onplay = () => {
      loop()
    }
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((mediaStream) => {
        getMedia(mediaStream)
      })
  }, [])
}
