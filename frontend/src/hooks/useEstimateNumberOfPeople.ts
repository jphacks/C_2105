import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs'
import { useCallback, useRef } from 'react'

export const useEstimateNumberOfPeople = () => {
  const inFront = useRef<boolean>()
  const estimateNumberOfPeople = useCallback(async (webcam) => {
    const model = await bodyPix.load()
    const segmentation = await model.segmentMultiPerson(webcam)
    // console.log(segmentation.length ? 'true' : 'false')

    inFront.current = segmentation.length ? true : false
  }, [])

  return {
    estimateNumberOfPeople,
    inFront,
  }
}
