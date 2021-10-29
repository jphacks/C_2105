import { useContext, useState, createContext } from 'react'
import { Project } from '../types/types'

const initialProject = {
  id: 0,
  title: '自動選択',
  explanation: '自動選択',
  earnedValue: 0,
}

type StateContextType = {
  project: Project
  setProject: React.Dispatch<React.SetStateAction<Project>>
}
const StateContext = createContext({} as StateContextType)

export const ProjectProvider: React.FC = ({ children }) => {
  const [project, setProject] = useState<Project>(initialProject)
  return (
    <StateContext.Provider value={{ project, setProject }}>
      {children}
    </StateContext.Provider>
  )
}
export const useProjectContext = (): StateContextType =>
  useContext(StateContext)
