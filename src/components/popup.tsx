import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {PopupAtom, PopupDataAtom} from "../recoil/popup";
import {NFT} from "../type/NFT";
import {myNFTListAtom} from "../recoil/myNFTList";
import {addressAtom} from "../recoil/address";
import {deleteMyNFT, getNewToken} from "../utils/collection";
import {useCookies} from "react-cookie";

const Popup = ({setTokenInCookie} : {setTokenInCookie(address: string, token: string): void}) => {
  const address = useRecoilValue(addressAtom);
  const setPopup = useSetRecoilState(PopupAtom);
  const popupData = useRecoilValue(PopupDataAtom);
  const [myNFTList, setMyNFTList] = useRecoilState(myNFTListAtom);
  const [cookies, setCookie, removeCookie] = useCookies(['access-token']);

  const deleteThisNFT = async () => {
    await checkMyNFT();
    const removeList = [...myNFTList].filter((list: NFT) => { return list.image !== popupData.image });
    setMyNFTList(removeList);
    setPopup(false);
  }

  const checkMyNFT = async () => {
    if (address.toLowerCase() !== popupData.address.toLowerCase()) {
      return;
    }
    const token = await checkHaveToken();
    console.log(token, '????')
    await deleteMyNFT(popupData.id, token);
  }

  const checkHaveToken = async () => {
    const accessTokenData = cookies['access-token'];

    if (!accessTokenData || accessTokenData.address !== address) {
      const newToken = await getNewToken(address);
      setTokenInCookie(newToken.address, newToken.token);
      return newToken.token;
    }
    return accessTokenData.token;
  }

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/25"
        onClick={() => setPopup(false)}
      ></div>
        <div className="relative flex flex-col justify-center items-center w-72 h-52 lg:w-96 lg:h-64 bg-gray-50 rounded-md p-5">
          <button
            className="absolute top-4 right-4 w-3"
            onClick={() => setPopup(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/>
            </svg>
          </button>
          <h2 className="text-xl text-center break-words mb-4">{popupData.name}</h2>
          <p className="text-center break-words mb-8">Are you going to delete this NFT in database?</p>
          <button
            className="text-white bg-[#6366F1] rounded-md opacity-75 px-4 py-1 hover:opacity-100 duration-300"
            onClick={deleteThisNFT}
          >Delete</button>
        </div>
    </div>
  );
};

export default Popup;
