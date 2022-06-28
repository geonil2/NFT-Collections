import React from 'react';
import {NFT, Attribute} from "../type/NFT";
import {useSetRecoilState} from "recoil";
import {PopupAtom, PopupDataAtom} from "../recoil/popup";

const NftCard = ({ nft } : { nft : NFT }) => {
  const setPopup = useSetRecoilState(PopupAtom);
  const setPopupDataAtom = useSetRecoilState(PopupDataAtom);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          {nft.animation ?
            <video autoPlay loop src={nft.animation} className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" ></video> :
            <img alt="NFT image" className="lg:w-4/12 w-full lg:h-auto object-cover object-center rounded" src={nft.image} />
          }
          <div className="lg:w-8/12 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="flex justify-between">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                NFT NAME
              </h2>
              <button
                className="w-3"
                onClick={() => (setPopup(true), setPopupDataAtom(nft))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/>
                </svg>
              </button>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{nft.name}</h1>
            <div className="flex mb-4"></div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">DESCRIPTION</h2>
            <p className="leading-relaxed">{nft.description}</p>
            <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-100"></div>
            <ul className="w-auto flex flex-wrap mt-5">
              {nft.attributes.map((list: Attribute, index) => (
                <>
                  <li key={index} className="w-1/4 md:w-1/6 text-center border border-solid border-[#6366F1] rounded-md p-2 m-1">
                    <h3 className="text-sm text-black pb-1">{list.trait_type}</h3>
                    <p className="text-xs text-black">{list.value}</p>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NftCard;
