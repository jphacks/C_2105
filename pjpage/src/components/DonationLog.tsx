import { FC } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Log } from "../types/log";

type Props = {
  id: number;
};

export const DonationLog: FC<Props> = ({ id }) => {
  const useQueryLogs = () => {
    const getLogs = async (): Promise<Log[]> => {
      const { data } = await axios.get<Log[]>(
        `${process.env.REACT_APP_REST_URL}/log?id=${id}`
      );
      return data;
    };
    return useQuery<Log[], Error>({
      queryKey: "logs",
      queryFn: getLogs,
      staleTime: 0,
    });
  };
  const { status, data } = useQueryLogs();
  if (status === "loading" || !data) return <div>load</div>;
  if (status === "error") return <div>Error</div>;

  let latestDonateHistory = data!.reverse();

  return (
    <div className="has-text-left my-5">
      <h2 className="is-size-4 has-text-weight-semibold">寄付ログ</h2>
      <ul>
        {latestDonateHistory.map((data) => (
          <li>{`${data.date} ${data.earnedValue}円の寄付がありました。`}</li>
        ))}
      </ul>
    </div>
  );
};
