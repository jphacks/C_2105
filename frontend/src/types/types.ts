//そんなに多くなさそうなので、一つにまとめてよさそう

export type Project = {
  id: number
  title: string
  explanation: string
  Progress?: number
  imgUrl?: string
  earnedValue?: number //Arduino側から渡されたお金
}
