import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {myNFTListAtom} from "../recoil/myNFTList";
import {addressAtom} from "../recoil/address";
import {PopupAtom} from "../recoil/popup";

import {NETWORK} from "../../config";

import {findBeforeNFT, getNewToken, getNFTData} from "../utils/collection";
import NFTCard from "../components/NFTCard";
import {shortCutAddress} from "@geonil2/util-func";
import {NFT} from "../type/NFT";
import Popup from "../components/popup";
import {useCookies} from "react-cookie";

const Home: NextPage = () => {
  const address = useRecoilValue(addressAtom);
  const [myNFTList, setMyNFTList] = useRecoilState(myNFTListAtom);
  const [popup, setPopup] = useRecoilState(PopupAtom);
  const [network, setNetwork] = useState('Klaytn');
  const [NFTAddress, setNFTAddress] = useState('');
  const [myAddress, setMyAddress] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['access-token']);

  const submitSearch = async (): Promise<void> => {
    const getMyNFTOfProject = await getNFTData(NFTAddress, myAddress, network);
    const filteringNFTList = checkSameNFT(getMyNFTOfProject);
    setMyNFTList((prev: NFT[]) => [...prev, ...filteringNFTList]);
  }

  const checkSameNFT = (getMyNFTOfProject: NFT[]): NFT[] => {
    const parsingList = JSON.stringify(myNFTList);
    const removeSameList = getMyNFTOfProject.filter((list: NFT) => {
      return !parsingList.includes(JSON.stringify(list))
    });
    return removeSameList;
  }

  // useEffect(() => {
  //   removeCookie('access-token')
  // })

  const checkLoginStatus = async (): Promise<void> => {
    if (!address) {
      alert('Please connect wallet');
      return;
    }
    const token = await getAccessToken();
    const beforeNFTList = await findBeforeNFT(address, network.toLowerCase(), token);
    setMyNFTList(beforeNFTList);
  }

  const getAccessToken = async (): Promise<string> => {
    const accessTokenData = cookies['access-token'];

    if (!accessTokenData || accessTokenData.address !== address) {
      const newToken = await getNewToken(address);
      setTokenInCookie(newToken.address, newToken.token);
      return newToken.accessToken;
    }
    return accessTokenData.token;
  }

  const setTokenInCookie = (address: string, token: string): void => {
    const limitInHour = 24;
    const newDate = new Date();

    newDate.setHours(newDate.getHours() + limitInHour);
    setCookie('access-token', {address, token}, { expires: newDate })
  }

  useEffect(() => {
    setMyAddress(address);
    setNFTAddress('');
  }, [address])

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container flex text-4xl font-bold px-5 pt-10 pb-5 mx-auto">Search Project</div>
        <div className="container flex px-5 py-2 mx-auto">
          {/*<p className="text-2xl text-black">Select Network</p>*/}
          <ul className="flex items-center">
            {NETWORK.map((list) => (
              <li
                key={list.id}
                className={`${list.className} bg-red-600 rounded-md py-0.5 px-5 mr-5 opacity-75 cursor-pointer hover:opacity-100 duration-300`}
                onClick={() => setNetwork(list.name)}
              >{list.name}</li>
            ))}
          </ul>
        </div>

        {/*<div className="container text-lg px-5 py-1 mx-auto">Network : {network}</div>*/}

        <div className="flex flex-col lg:flex-row lg:items-center container px-5 py-1 mx-auto">
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
            className="h-8 bg-[#6366F1] text-white rounded-md opacity-75 py-0.5 px-5 hover:opacity-100 duration-300"
            onClick={submitSearch}
          >Search</button>
          <button
            className="h-8 bg-[#6366F1] text-white rounded-md opacity-75 py-0.5 px-5 lg:mx-2 mt-2 lg:mt-0 hover:opacity-100 duration-300"
            onClick={checkLoginStatus}
          >Only Show My NFT</button>
        </div>
      </section>

      {myNFTList.length ? myNFTList.map((list: NFT) => (
        <NFTCard nft={list} key={list.id} />
      )) : null}

      {popup ? <Popup setTokenInCookie={setTokenInCookie}/> : null}
    </>
  );
};

export default Home
