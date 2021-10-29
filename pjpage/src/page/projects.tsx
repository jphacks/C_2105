import React, { FC } from 'react';
import queryString from 'query-string';
import { dataProps, projectData } from '../dummyData/dummyProjects';
import 'bulma/css/bulma.css';
import './projects.css';

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
    <div className="pjpage has-text-white pb-5">
      <div className={`${!project && 'is-hidden'} container`}>
        <div className="sub-container">
          <div>
            <p className="is-size-5 has-text-weight-bold p-4">スマート貯金箱</p>
          </div>
          <div className="">
            <img className="top-image" src={project?.img} alt={project?.title} />
          </div>

          <h1 className="is-size-4 has-text-weight-bold p-4">
            {project?.title}
          </h1>

          <div className="has-text-left my-5">
            <h2 className="is-size-4 has-text-weight-semibold">
              概要
            </h2>
            <p>
              {project?.explanation}
            </p>
          </div>

          <div className="has-text-left my-5">
            <h2 className="is-size-4 has-text-weight-semibold">
              寄付ログ
            </h2>
            <ul>
              { latestDonateHistory.map((data) => (
                <li>{`${data?.date} ${data?.money}円の寄付がありました。`}</li>
              )) }
            </ul>
          </div>

          <div className="has-text-left my-5">
            <h2 className="is-size-4 has-text-weight-semibold">
              プロジェクトからのお知らせ
            </h2>
            { latestNews.map((data) => (
              <a href="/?no=2" className="columns is-mobile card m-2">
                <img className="column is-3" src={data?.img} alt={data?.title} />
                <div className="column is-9 is-relative">
                  <h3 className="is-size-5 has-text-weight-semibold">{data?.title}</h3>
                  <p className="mb-4">{data?.body}</p>
                  <p className="news-update">{data?.date}</p>
                </div>
              </a>
            )) }
          </div>

        </div>

        </div>
        
    </div>
  )
}

