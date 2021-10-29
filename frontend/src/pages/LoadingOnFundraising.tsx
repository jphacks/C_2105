import axios from 'axios'
import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Gallery } from '../components/Gallery'
import { Loading } from '../components/Loading'
import { useProjectContext } from '../context/ProjectProvider'
import { Project } from '../types/types'
import socketIOClient from 'socket.io-client'

type DonatedProject = Pick<Project, 'id' | 'earnedValue'>
const ENDPOINT = process.env.REACT_APP_ARDUINO_ENDPOINT

export const LoadingOnFundraising: FC = () => {
  const history = useHistory()
  const { project: selectedProject, setProject } = useProjectContext()

  const reqUrl =
    selectedProject.id === 0
      ? `collect?earnedValue=${selectedProject.earnedValue}`
      : `collect?id=${selectedProject.id}&earnedValue=${selectedProject.earnedValue}`
  useEffect(() => {
    const postProject = async () => {
      try {
        await axios
          .get<DonatedProject>(`${process.env.REACT_APP_REST_URL}${reqUrl}`)
          .then(({ data }) => {
            history.push(`/${data.id}/result`, data)
          })
      } catch (e) {
        alert(e)
      }
    }
    let earnedValue: number
    const socket = socketIOClient(ENDPOINT!)
    socket.on('donated', (data) => {
      earnedValue = Number(Object.keys(data)[0]) * data[Object.keys(data)[0]]

      setProject({
        ...selectedProject,
        earnedValue: selectedProject.earnedValue! + earnedValue,
      })
    })

    socket.on('fin', async () => {
      await postProject()
    })
    return () => {
      socket.disconnect()
    }
  }, [selectedProject.earnedValue])

  return (
    <>
      <div className="flex text-3xl items-center absolute top-12 stat-value ">
        募金額:{selectedProject.earnedValue}円
      </div>
      <div className="flex text-3xl items-center absolute top-24 stat-value">
        <Loading className="mr-4 flex items-center" width={40} />
        <div className="">
          {selectedProject.title}
          {selectedProject.id === 0 ? 'で' : 'に'}募金中...
        </div>
      </div>
      <Gallery />
    </>
  )
}
