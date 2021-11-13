import { useEffect } from 'react'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'
import { useMutateProject } from './useMutateProject'
import { useSocketRef } from './useSocketRef'

export const useDonatedProject = (): Project => {
  const { project: selectedProject } = useProjectContext()
  const { updateProjectMutation } = useMutateProject()
  const { socketRef } = useSocketRef()
  useEffect(() => {
    let earnedValue: number
    if (socketRef.current !== undefined) {
      socketRef.current.on('donated', async (data) => {
        earnedValue = Number(Object.keys(data)[0]) * data[Object.keys(data)[0]]
        //無駄にレンダリング増えた気がする
        updateProjectMutation.mutate(earnedValue)
      })
    }
  }, [])
  return {
    ...selectedProject,
  }
}
