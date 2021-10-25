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
      <div className="stat-value text-4xl mt-16">スマート貯金箱</div>
      <div className="text-xl">受付中の募金一覧</div>
      <div className="w-24 h-2 bg-green-500 mb-8" />

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
