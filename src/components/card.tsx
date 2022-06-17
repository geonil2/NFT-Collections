import React from 'react';
import { Project } from '../type/project';

const Card = ({project}: {project: Project}) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <img className="h-40 rounded w-full object-cover object-center mb-6" src={project.coverImg}
             alt="content"/>
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{project.keywords}</h3>
        <ul className="flex text-sm mt-0.5 mb-0.5">
          <li>{project.startDate} ~&nbsp;</li>
          <li>{project.endDate}</li>
        </ul>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{project.title}</h2>
        <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery
          hexagon disrupt edison bulbche.</p>
      </div>
    </div>
  );
};

export default Card;
