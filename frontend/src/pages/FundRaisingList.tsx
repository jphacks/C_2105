import { FC, useEffect } from 'react'
import { FundRasingMemoItems } from '../components/FundRaisingItems'
import socketIOClient from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { useProjectContext } from '../context/ProjectProvider'

type Props = {}
const ENDPOINT = 'http://localhost:3001'
const earnedValue = 1000
export const FundRaisingList: FC<Props> = () => {
  const history = useHistory()
  const { project: selectedProject, setProject } = useProjectContext()

  //TODO お金が入金されたか判定処理(きっと差分がArduino側から渡されるはず・・・・・・・・)
  //↓仮実装、10 秒経つと遷移する(挙動が若干おかしいけど、多分setTimeoutのせい) とりあえずbutton設置した
  // setTimeout(() => history.push(`/${selectedProject!.id}/loading`), 10000)
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    setProject({ ...selectedProject!, earnedValue: earnedValue })
    return () => {
      socket.disconnect()
    }
    //選択後に無理矢理、earnedValueを上書きしている あんまりよろしくない
    /*eslint-disable-next-line*/
  }, [selectedProject?.id])
  return (
    <>
      <h1>スマート貯金箱</h1>
      <div>募金したいプロジェクトを選んで、コインを入れてください</div>
      <FundRasingMemoItems />
      <button
        onClick={() => history.push(`/${selectedProject!.id}/loading`)}
        className="bg-gray-500 text-white w-16 h-16 mt-4"
      >
        仮遷移用ボタン
      </button>
    </>
  )
}
