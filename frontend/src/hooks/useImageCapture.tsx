import { useEffect } from 'react'
import { useRef } from 'react'

export const useImageCapture = () => {
  const imageURL = useRef<string>()
  const canvas = document.createElement('canvas')
  const video = document.createElement('video')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //fps上げすぎるとsocket通信が落ちます
  const fps = 10
  const loop = () => {
    setTimeout(() => {
      requestAnimationFrame(loop)
      canvas.getContext('2d')!.drawImage(video, 0, 0)
      imageURL.current = canvas.toDataURL('image/jpeg')
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

  return {
    imageURL,
  }
}
