import { FC, memo, useCallback } from 'react'
import { FundRasingMemoItem } from './FundRasingItem'
import { projectData } from '../dummyData/dummyProjects'
import { useProjectContext } from '../context/ProjectProvider'

const defaultProject = {
  id: 0,
  title: '自動選択',
  explanation: '自動でプロジェクトが選ばれて、募金されます。',
}

const FundRasingItems: FC = () => {
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
        {defaultProject.id === selectedProject!.id ? (
          //親要素だけ広げて、子要素に影響させないことはできる？
          <div className="bg-green-500 bg-opacity-75 p-2">
            <FundRasingMemoItem
              project={defaultProject}
              changeProject={changeProject}
            />
          </div>
        ) : (
          <FundRasingMemoItem
            project={defaultProject}
            changeProject={changeProject}
          />
        )}
      </>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <DefaultProjectItem />
      {projectData.length > 0 &&
        projectData.map((project) => (
          <div key={project.id}>
            {project.id === selectedProject!.id ? (
              //親要素だけ広げて、子要素に影響させないことはできる？
              <div className="bg-green-500 bg-opacity-75 p-2">
                <FundRasingMemoItem
                  key={project.id}
                  project={project}
                  changeProject={changeProject}
                />
              </div>
            ) : (
              <FundRasingMemoItem
                project={project}
                changeProject={changeProject}
              />
            )}
          </div>
        ))}
    </div>
  )
}
export const FundRasingMemoItems = memo(FundRasingItems)
