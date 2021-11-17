import { FC } from 'react'
import { useGetImageCapture } from '../hooks/useGetImageCapture'

export const Layout: FC = ({ children }) => {
  useGetImageCapture()
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <header></header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
    </div>
  )
}
