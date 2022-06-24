import React from 'react';
import {GetStaticProps, NextPage} from "next";
import axios from "axios";
import { Token, DatabaseId } from "../../config"
import { Tag, Project } from '../type/project';
import Card from '../components/card';

const Project = ({ projectData } : { projectData: Project[] }) => {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Pitchfork Kickstarter
              Taxidermy</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon
            brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them
            man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
        </div>

        <div className="flex flex-wrap -m-4">
          {projectData.map((project: Project) => {
            return <Card project={project} key={project.id} />
          })}
        </div>
      </div>
    </section>
  );
};

export async function getStaticProps(context) {
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${DatabaseId}/query`,
    data: {
      sorts: [
        {
          property: "Date",
          direction: "ascending"
        }
      ]
    },
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Token}`
    }
  };

  const res = await axios.request(options);

  const projectData = res.data.results.map((project: any) => {
    const id = project.id;
    const coverImg = project.cover.external.url;
    const { Date, Tags, Name } = project.properties;
    const keywords = Tags.multi_select.map((tag: Tag) => (tag.name));
    const startDate = Date.date.start;
    const endDate = Date.date.end;

    return {
      id,
      title: Name.title[0].plain_text,
      keywords,
      startDate,
      endDate,
      coverImg
    }
  })

  return {
    props: { projectData }, // will be passed to the page component as props
  }
}

export default Project;

