import {atom} from "recoil";
import {NFT} from "../type/NFT";

export const myNFTListAtom = atom<NFT[]>({
  key: 'myNFTList',
  default: []
})
