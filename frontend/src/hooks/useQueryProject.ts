import { useQuery } from 'react-query'
import axios from 'axios'
import { Project } from '../types/types'
//eslint-disable-next-line
export const useQueryProjects = () => {
  const getProjects = async () => {
    const { data } = await axios.get<Project[]>(
      `${process.env.REACT_APP_REST_URL}project`
    )
    return data
  }
  return useQuery<Project[], Error>({
    queryKey: 'projects',
    queryFn: getProjects,
    staleTime: 0,
  })
}
