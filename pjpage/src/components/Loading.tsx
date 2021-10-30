import ReactLoading, { LoadingProps } from 'react-loading'

export const Loading: React.FC<LoadingProps> = (props) => {
  return <ReactLoading type="spin" color="black" {...props} />
}
