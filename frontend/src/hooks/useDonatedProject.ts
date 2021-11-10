import { useEffect } from 'react'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'
import socketIOClient from 'socket.io-client'
import { useMutateProject } from './useMutateProject'

const ENDPOINT = process.env.REACT_APP_ARDUINO_ENDPOINT

export const useDonatedProject = (): Project => {
  const { project: selectedProject } = useProjectContext()
  const { updateProjectMutation } = useMutateProject()
  useEffect(() => {
    let earnedValue: number
    const socket = socketIOClient(ENDPOINT!)
    socket.on('donated', async (data) => {
      earnedValue = Number(Object.keys(data)[0]) * data[Object.keys(data)[0]]
      //無駄にレンダリング増えた気がする
      updateProjectMutation.mutate(earnedValue)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  // console.log(selectedProject)
  return {
    ...selectedProject,
  }
}
