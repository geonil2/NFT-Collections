import {atom} from "recoil";
import {NFT} from "../type/NFT";

export const PopupAtom = atom({
  key: "popup",
  default: false
})

export const PopupDataAtom = atom<NFT>({
  key: "popupData",
  default: {
    id: 0,
    address: '',
    url: '',
    network: '',
    name: '',
    image: '',
    description: '',
    animation: '',
    attribute: {
      trait_type: '',
      value: ''
    }
  }
})

