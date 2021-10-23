import React, { FC } from 'react'
import { FundRasingItem } from './FundRasingItem'
import { projectData } from '../dummyData/dummyProjects'
type Props = {}

export const FundRasingItems: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {projectData.length > 0 &&
        projectData.map((project) => <FundRasingItem project={project} />)}
    </div>
  )
}
