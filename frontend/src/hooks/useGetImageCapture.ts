import { useSocketRef } from './useSocketRef'
import { useEffect } from 'react'
export const useGetImageCapture = async () => {
  const { socketRef } = useSocketRef()

  const getMedia = (mediaStream: MediaStream) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')

    video.autoplay = true
    video.srcObject = mediaStream
    video.onplay = () => {
      canvas!.getContext('2d')!.drawImage(video, 0, 0)
      const image = canvas!.toDataURL('image/jpeg')
      socketRef.current?.emit('image', { image: image })
    }
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((mediaStream) => {
        setInterval(() => {
          getMedia(mediaStream)
        }, 10000)
      })
  }, [])
}
