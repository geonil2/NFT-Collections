import React, {useEffect, useState} from 'react';

import {useRecoilValue, useSetRecoilState} from "recoil";
import {AddressAtom} from "../recoil/address";

import Link from 'next/link';
import {connectWallet} from "../utils/wallet";

const Header = () => {
  const [onTicker, setOnTicker] = useState(false);
  const Address = useRecoilValue(AddressAtom);
  const setAddressAtom = useSetRecoilState(AddressAtom);

  const getAddress = async () => {
    const wallet = await connectWallet();
    setAddressAtom(wallet);
  }

  const copyAddress = () => {
    setOnTicker(true);

    let tempElem = document.createElement('textarea');
    tempElem.value = Address;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
  }

  useEffect(() => {
    if (onTicker) {
      setTimeout(() => {
        setOnTicker(false)
      }, 2000)
    }
  }, [onTicker])
  
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2"
               className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Auto transaction</span>
          </a>
        </Link>
        <nav className={Address ? "md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center" : "md:mr-auto"}>
          {Address ?
            <>
              <Link href="/sell"><a className="mr-5 hover:text-gray-900">Sell</a></Link>
              <Link href="/cancel"><a className="mr-5 hover:text-gray-900">Cancel</a></Link>
              <Link href="/project"><a className="mr-5 hover:text-gray-900">Project</a></Link>
            </>
            : null
          }
        </nav>
        {Address ?
          <div
            className="relative inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer"
            onClick={copyAddress}
          >
            {Address}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 ml-2" fill="gray">
              <path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/>
            </svg>

            {onTicker ? <div className="absolute top-10 right-0 text-sm text-red-600 bg-gray-50 rounded p-1.5">Copy!</div> : null}
          </div>
          :
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={getAddress}
          >
            Connect Wallet
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        }
      </div>
    </header>
  );
};

export default Header;
