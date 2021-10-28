import { FC, memo, useCallback } from 'react'
import { FundRasingMemoItem } from './FundRasingItem'
// import { projectData } from '../dummyData/dummyProjects'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'

const defaultProject = {
  id: 0,
  title: '自動選択',
  explanation: '自動でプロジェクトが選ばれて、募金されます。',
}

type Props = {
  projects: Project[]
}

const FundRasingItems: FC<Props> = ({ projects }) => {
  const { project: selectedProject, setProject } = useProjectContext()
  const changeProject = useCallback(
    (e) => {
      setProject(e)
    },
    [setProject]
  )
  const DefaultProjectItem = () => {
    return (
      <>
        {defaultProject.id === selectedProject.id ? (
          <div className="bg-green-300 bg-opacity-75 p-2 rounded-lg">
            <FundRasingMemoItem
              project={defaultProject}
              changeProject={changeProject}
            />
          </div>
        ) : (
          <div className="bg-white p-2">
            <FundRasingMemoItem
              project={defaultProject}
              changeProject={changeProject}
            />
          </div>
        )}
      </>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <DefaultProjectItem />
      {projects.length > 0 &&
        projects.map((project: Project) => (
          <div key={project.id}>
            {project.id === selectedProject.id ? (
              <div className="bg-green-300 bg-opacity-75 p-2 rounded-lg">
                <FundRasingMemoItem
                  key={project.id}
                  project={project}
                  changeProject={changeProject}
                />
              </div>
            ) : (
              <div className="bg-white p-2">
                <FundRasingMemoItem
                  project={project}
                  changeProject={changeProject}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
export const FundRasingMemoItems = memo(FundRasingItems)
