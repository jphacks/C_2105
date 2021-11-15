import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import { useCallback, useRef } from 'react'

export const useEstimateNumberOfPeople = () => {
  const inFront = useRef<boolean>()
  const segmentation = useRef<bodyPix.PersonSegmentation[]>()
  const estimateNumberOfPeople = useCallback(async (webcam) => {
    if (!inFront.current) {
      const model = await bodyPix.load()
      segmentation.current = await model.segmentMultiPerson(webcam)
      // console.log(segmentation.length ? 'true' : 'false')
    }
    if (segmentation.current) {
      inFront.current = segmentation.current.length ? true : false
    }
  }, [])

  return {
    estimateNumberOfPeople,
    inFront,
  }
}
