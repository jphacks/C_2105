import axios from 'axios'
import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Gallery } from '../components/Gallery'
import { Loading } from '../components/Loading'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'

type DonatedProject = Pick<Project, 'id' | 'earnedValue'>

export const LoadingOnFundraising: FC = () => {
  const history = useHistory()
  const { project: selectedProject } = useProjectContext()
  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay))
  }
  const reqUrl =
    selectedProject.id === 0
      ? `collect?earnedValue=${selectedProject.earnedValue}`
      : `collect?id=${selectedProject.id}&earnedValue=${selectedProject.earnedValue}`
  useEffect(() => {
    const postProject = async () => {
      try {
        //わざと遅らせてる
        await timeout(3600)
        await axios
          .get<DonatedProject>(`${process.env.REACT_APP_REST_URL}${reqUrl}`)
          .then(({ data }) => {
            history.push(`/${data.id}/result`, data)
          })
      } catch (e) {
        alert(e)
      }
    }
    postProject()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="flex text-3xl items-center absolute top-24">
        <Loading className="mr-4 flex items-center" width={40} />
        <div>募金中...</div>
      </div>
      <Gallery />
    </>
  )
}
