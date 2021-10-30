import React, { FC } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import queryString from "query-string";
// import socketIOClient from 'socket.io-client'
import "bulma/css/bulma.css";
import "./projects.css";
import { Project } from "../types/project";
import { DonationLog } from "../components/DonationLog";
import { Loading } from "../components/Loading";
import { ProjectNews } from "../components/ProjectNews";
// import { QueryClient, QueryClientProvider } from "react-query";
// type Props = {};

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

export const Projects: FC = () => {
  const queryParams = queryString.parse(window.location.search);

  const useQueryProjects = () => {
    const getProjects = async (): Promise<Project[]> => {
      const { data } = await axios.get<Project[]>(
        `${process.env.REACT_APP_REST_URL}/project`
      );
      return data;
    };
    return useQuery<Project[], Error>({
      queryKey: "projects",
      queryFn: getProjects,
      staleTime: 0,
    });
  };
  const { status, data } = useQueryProjects();

  if (status === "loading" || !data) return <Loading />;
  if (status === "error") return <div>Error</div>;
  // console.log(queryParams);
  let project: Project | undefined;
  if (queryParams.no) {
    project = data.find((data) => data.id === Number(queryParams.no));
  }
  console.log(project);
  if (!project) {
    return <div>loading</div>;
  }

  return (
    <div className="pjpage has-text-white-ter pb-5">
      <div className={`container`}>
        <div className="sub-container">
          <div>
            <p className="is-size-5 has-text-weight-bold p-4">スマート貯金箱</p>
          </div>
          <div className="">
            <img
              className="top-image"
              src={project.imgUrl}
              alt={project.title}
            />
          </div>

          <h1 className="is-size-4 has-text-weight-bold p-4">
            {project.title}
          </h1>

          <div className="has-text-left my-5">
            <h2 className="is-size-4 has-text-weight-semibold">概要</h2>
            <p>{project.explanation}</p>
          </div>

          <DonationLog id={project.id} />

          <ProjectNews id={project.id} />
        </div>
      </div>
    </div>
  );
};
