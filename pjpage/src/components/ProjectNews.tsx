import { FC } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Column } from "../types/column";

type Props = {
  id: number;
};

export const ProjectNews: FC<Props> = ({ id }) => {
  const useQueryColumns = () => {
    const getColumns = async (): Promise<Column[]> => {
      const { data } = await axios.get<Column[]>(
        `${process.env.REACT_APP_REST_URL}/column?id=${id}`
      );
      return data;
    };
    return useQuery<Column[], Error>({
      queryKey: "columns",
      queryFn: getColumns,
      staleTime: 0,
    });
  };
  const { status, data } = useQueryColumns();
  if (status === "loading" || !data) return <div>load</div>;
  if (status === "error") return <div>Error</div>;

  let latestNews = data!.reverse();

  return (
    <div className="has-text-left my-5">
      <h2 className="is-size-4 has-text-weight-semibold">
        プロジェクトからのお知らせ
      </h2>
      {latestNews.map((data) => (
        <div className="card my-2 p-2">
          <h3 className="is-size-5 has-text-weight-semibold">
            {data.columnTitle}
          </h3>
          <div className="columns is-mobile is-multiline">
            <figure className="column is-3-desktop is-full-touch">
              <img
                className=""
                src={data.imgUrl}
                alt={data.columnTitle}
              />
            </figure>
            <div className="column is-relative">
              <p className="mb-6">{data.body}</p>
              <p className="news-update">{`${data.date.slice(0,4)}年${data.date.slice(4,6)}月${data.date.slice(6,8)}日`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
