export type Project = {
  id: number;
  title: string;
  explanation: string;
  progress?: number;
  imgUrl?: string;
  earnedValue?: number;
  targetAmount?: number;
}