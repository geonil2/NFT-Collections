import React from 'react';
import {NFT, Attribute} from "../type/NFT";

const NftCard = ({ nft } : { nft : NFT }) => {
  console.log(nft, '!@!@!@')
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          {nft.animation ?
            <video autoPlay loop src={nft.animation} type="video/mp4" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" ></video> :
            <img alt="ecommerce" className="lg:w-4/12 w-full lg:h-auto object-cover object-center rounded" src={nft.image} />
          }
          <div className="lg:w-8/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">NFT NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{nft.name}</h1>
            <div className="flex mb-4"></div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">DESCRIPTION</h2>
            <p className="leading-relaxed">{nft.description}</p>
            <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-100"></div>
            <ul className="w-auto flex flex-wrap mt-5">
              {nft.attributes.map((list: Attribute) => (
                <li className="w-1/4 md:w-1/6 text-center border border-solid border-[#6366F1] rounded-md p-2 m-1">
                  <h3 className="text-sm text-black pb-1">{list.trait_type}</h3>
                  <p className="text-xs text-black">{list.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NftCard;
