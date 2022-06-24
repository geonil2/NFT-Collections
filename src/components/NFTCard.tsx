import React from 'react';
import {NFTCard} from "../type/NFT";

const NftCard = ({ card } : { card : NFTCard }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {card.animation_url ?
            <video autoPlay loop src={card.animation_url} type="video/mp4" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" ></video> :
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src={card.image} />
          }
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">NFT NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{card.name}</h1>
            <div className="flex mb-4">
            </div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">DESCRIPTION</h2>
            <p className="leading-relaxed">{card.description}</p>
            <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-100">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NftCard;
