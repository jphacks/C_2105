import { FC } from 'react'
import { firstPage } from './firstPage'
import styles from './Background.module.css'
import { useHistory } from 'react-router'

export const Background: FC = () => {
  const history = useHistory()
  firstPage()

  return (
    <div
      className={styles.bubbleBackground}
      onClick={() => {
        history.push('/project-list')
      }}
    >
      <div>スマート募金</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce h-12 w-12 mt-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </div>
  )
}
