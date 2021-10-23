import { useContext, useState, createContext } from 'react'
import { Project } from '../types/types'

const initialProject = {
  id: 0,
  title: '',
  explanation: '',
}

type StateContextType = {
  project: Project | null
  setProject: React.Dispatch<React.SetStateAction<Project | null>>
}
const StateContext = createContext({} as StateContextType)

export const ProjectProvider: React.FC = ({ children }) => {
  const [project, setProject] = useState<Project | null>(initialProject)
  return (
    <StateContext.Provider value={{ project, setProject }}>
      {children}
    </StateContext.Provider>
  )
}
export const useProjectContext = (): StateContextType =>
  useContext(StateContext)
