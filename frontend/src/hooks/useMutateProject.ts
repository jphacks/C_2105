import axios from 'axios'
import { useMutation } from 'react-query'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'
export const useMutateProject = () => {
  const { project: selectedProject, setProject } = useProjectContext()
  const updateProjectMutation = useMutation(
    (earnedValue: number) =>
      //getはダメでは。
      axios.get<Project>(
        `${process.env.REACT_APP_REST_URL}/${
          selectedProject.id === 0
            ? `collect?earnedValue=${earnedValue}`
            : `collect?id=${selectedProject.id}&earnedValue=${earnedValue}`
        }`
      ),
    {
      onSuccess: (res, val) => {
        if (selectedProject.id == 0) {
          const state = res.data
          setProject({
            id: state.id,
            explanation: state.explanation,
            imgUrl: state.imgUrl,
            targetAmount: state.targetAmount,
            progress: state.progress,
            title: state.title + 'に募金されました。',
            earnedValue: val,
          })
        } else {
          const sumValue = !selectedProject.earnedValue
            ? val
            : selectedProject.earnedValue + val
          setProject({
            ...selectedProject,
            earnedValue: sumValue,
          })
        }
      },
    }
  )
  return { updateProjectMutation }
}
