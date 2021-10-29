import React, { FC } from 'react';
import queryString from 'query-string';
import { dataProps, projectData } from '../dummyData/dummyProjects';
import './projects.module.css';

type Props = {}

export const Projects: FC<Props> = () => {
  const queryParams = queryString.parse(window.location.search);

  let project: dataProps | undefined;
  if (queryParams.no) {
    project = projectData.find((data) => data.id === Number(queryParams.no));
  }

  const latestDonateHistory = [
    project?.donateHistory[project?.donateHistory.length - 1],
    project?.donateHistory[project?.donateHistory.length - 2],
    project?.donateHistory[project?.donateHistory.length - 3],
  ];

  const latestNews = [
    project?.news[project?.news.length - 1],
    project?.news[project?.news.length - 2],
    project?.news[project?.news.length - 3],
  ];

  return (
    <>
      <div className={`${!project && 'is-hidden'}`}>
        
        <span className="is-size-5">スマート貯金箱</span>
        <br />
        <img className="Main-image" src={project?.img} alt={project?.title} />

        <h1>
          {project?.title}
        </h1>

        <h2>概要</h2>
        <p>
          {project?.explanation}
        </p>

        <h2>寄付ログ</h2>
        { latestDonateHistory.map((data) => (
          <p>{`${data?.date} ${data?.money}円の寄付がありました。`}</p>
        )) }

        <h2>プロジェクトからのお知らせ</h2>
        { latestNews.map((data) => (
          <div className="columns is-mobile card">
            <img className="column is-3" src={data?.img} alt={data?.title} />
             <div className="column is-narrow">
               <h3>{data?.title}</h3>
               <p>{data?.body}</p>
               <p>{data?.date}</p>
             </div>
          </div>
        )) }

      </div>
    </>
  )
}

