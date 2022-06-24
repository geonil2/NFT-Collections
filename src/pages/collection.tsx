import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {myNFTListAtom} from "../recoil/myNFTList";

import {NETWORK} from "../../config";

import {getBalanceOfNFT} from "../utils/collection";
import NFTCard from "../components/NFTCard";
import {shortCutAddress} from "@geonil2/util-func";

const Collection = () => {
  const [network, setNetwork] = useState('Klaytn');
  const [myNFTList, setMyNFTList] = useRecoilState(myNFTListAtom);
  const [NFTAddress, setNFTAddress] = useState('');
  const [myAddress, setMyAddress] = useState('');

  const submitSearch = async () => {
    const checkStorage = checkStroageList();
    const myNFTofProject = await getBalanceOfNFT(NFTAddress, myAddress)
    setMyNFTList(myNFTofProject as []);
  }

  const checkStroageList = () => {
    window.localStorage.getItem(network);
  }

  useEffect(() => {
    console.log(myNFTList, '!@#!@#')
  }, [myNFTList])

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container flex text-4xl px-5 pt-10 pb-3 mx-auto">Search Project</div>
          <div className="container flex px-5 py-2 mx-auto">
            <p className="text-2xl text-black">Select Network</p>
            <ul className="flex items-center">
              {NETWORK.map((list) => (
                <li
                  key={list.id}
                  className={`${list.className} bg-gray-700 rounded-md py-0.5 px-5 mx-5 opacity-75 cursor-pointer hover:opacity-100`}
                  // onClick={() => setNetwork(list.name)}
                  onClick={() => (list.name === 'Ethereum' ? setNetwork('Comming Soon') : setNetwork(list.name))}
                >{list.name}</li>
              ))}
              <li
                className="h-8 bg-[#6366F1] text-white rounded-md py-0.5 px-5 mx-5 opacity-75 cursor-pointer hover:opacity-100"
                onClick={submitSearch}
              >Find Before NFT</li>
            </ul>
          </div>

          <div className="container text-lg text-[#6366F1] px-5 py-1 mx-auto">{network}</div>

          <div className="flex flex-col md:flex-row items-center container px-5 py-1 mx-auto">
            <div className="flex mr-5 my-2">
              <p>NFT Address : </p>
              <input
                type="text"
                value={shortCutAddress(NFTAddress, 10)}
                className="xl:w-80 w-40 border border-[#6366F1] border-solid focus:outline-[#6366F1] rounded-sm text-black mx-2 px-1"
                onChange={(e) => setNFTAddress(e.target.value)}
              />
            </div>

            <div className="flex my-2">
              <p>My Wallet Address : </p>
              <input
                type="text"
                value={shortCutAddress(myAddress, 10)}
                className="xl:w-80 w-40 border border-[#6366F1] border-solid focus:outline-[#6366F1] rounded-sm text-black mx-2 px-1"
                onChange={(e) => setMyAddress(e.target.value)}
              />
            </div>
            <button
              className="h-8 bg-[#6366F1] text-white rounded-xl px-2"
              onClick={submitSearch}
            >Search</button>
          </div>
      </section>

      {myNFTList.length ? myNFTList.map(list => (
        <NFTCard card={list} />
      )) : null}
    </>
  );
};

export default Collection;
