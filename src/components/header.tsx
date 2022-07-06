import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {addressAtom} from "../recoil/address";
import {networkAtom} from "../recoil/network";

import Link from 'next/link';
import {checkNetworkServer, connectWallet, getKlaytn} from "../utils/wallet";
import {shortCutAddress} from "@geonil2/util-func";
import Ani from "./ani";
import Logo from "../assets/json/logo.json";

const Header = () => {
  const [onTicker, setOnTicker] = useState(false);
  const [address, setAddress] = useRecoilState(addressAtom);
  const [network, setNetwork] = useRecoilState(networkAtom);

  const getAddress = async () => {
    const wallet = await connectWallet();
    setAddress(wallet);
  }

  const copyAddress = () => {
    setOnTicker(true);

    let tempElem = document.createElement('textarea');
    tempElem.value = address;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
  }

  const checkAutoLogin = () => {
    const myAddress = getKlaytn().selectedAddress;
    if (myAddress) {
      setAddress(myAddress)
    }
  }

  const changeWalletAddress = () => {
    getKlaytn().on('accountsChanged', (accounts: string[]) => {
      const newAddress = accounts[0];
      setAddress(newAddress)
    });
  }

  useEffect(() => {
    if (onTicker) {
      setTimeout(() => {
        setOnTicker(false)
      }, 2000)
    }
  }, [onTicker])

  useEffect(()=> {
    checkAutoLogin();
    setNetwork(checkNetworkServer());
    changeWalletAddress();
  }, [])
  
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Ani animation={Logo} />
            <span className="text-xl font-bold">NFT COLLECTIONS</span>
          </a>
        </Link>
        {address ?
          <div
            className="relative inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer"
            onClick={copyAddress}
          >
            {shortCutAddress(address, 10)}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 ml-2" fill="gray">
              <path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/>
            </svg>
            {onTicker ? <div className="absolute top-10 right-0 text-sm text-[#6366F1] bg-gray-50 rounded p-1.5">Copy!</div> : null}
          </div>
          :
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={getAddress}
          >
            Connect Wallet
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        }
      </div>
      {network ? <div className="bg-red-600 text-white text-center py-1">Check your Kaikas network.</div> : null}
    </header>
  );
};

export default Header;
