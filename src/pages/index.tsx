import type { NextPage } from 'next'

import {useSetRecoilState} from "recoil";
import { AddressAtom } from '../recoil/address';

import Wallet from '../assets/json/wallet.json';
import Privacy from '../assets/json/privacy.json';
import Animation from '../components/animation';
import { connectWallet } from '../utils/wallet';

const Home: NextPage = () => {
  const setAddressAtom = useSetRecoilState(AddressAtom);

  const getAddress = async () => {
    const wallet = await connectWallet();
    setAddressAtom(wallet);
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Option</h1>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/2 w-full">
            <div
              className="h-full bg-gray-100 p-8 rounded-xl hover:shadow-lg duration-200 cursor-pointer"
              onClick={getAddress}
            >
              <div className="flex justify-between">
                <div className="text-xl	text-black font-semibold mb-4">Connect wallet</div>
                <div className="text-red-600 font-semibold">Good</div>
              </div>
              <div className="flex justify-center">
                <Animation animation={Wallet} />
              </div>
                <p className="leading-relaxed text-center">It is recommended that you connect your wallet and use it.</p>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full">
            <div
              className="h-full bg-gray-100 p-8 rounded-xl hover:shadow-lg duration-200 cursor-pointer"
              // onClick={}
            >
              <div className="flex justify-between">
                <div className="text-xl	text-black font-semibold mb-4">Use wallet address & private key</div>
                <div className="text-red-600 font-semibold">bad</div>
              </div>
              <div className="flex justify-center">
                <Animation animation={Privacy} />
              </div>
              <p className="leading-relaxed text-center">You cannot link your wallet, but you can use it if you know your wallet address and private key.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
