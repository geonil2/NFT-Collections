import ERC721 from '../abis/ERC721.json';
import NFTFetcher from '../abis/NFTFetcher.json';
import axios from "axios";
import {NFTFETHCERADDRESS, BASEURL} from '../../config'

export const getNFTData = async (NFTAddress: string, myAddress: string, network: string) => {
  if (typeof  window === "undefined") {
    return;
  }
  //@ts-ignore
  const caver = window.caver;

  if (typeof caver === 'undefined') {
    throw new Error('Kaikas does not installed');
  }
  const projectContract = new caver.klay.Contract(ERC721, NFTAddress);
  const balance = await getBalanceOfNFT(projectContract, NFTAddress, myAddress);
  const myNFTs = await getMyNFTIds(caver, NFTAddress, myAddress, balance);
  const myNFTsAddresses = await getNFTsAddressOfIds(projectContract, myNFTs);
  return myNFTsAddresses.length ? await myNFTsInfo(myAddress, myNFTsAddresses, network) : []
}

const getBalanceOfNFT = async (projectContract: any, NFTAddress: string, myAddress: string) => {
  const balance = await projectContract.methods.balanceOf(myAddress).call();
  return balance ? balance : 0
}

const getMyNFTIds = async (caver: any, NFTAddress: string, myAddress: string, balance: string) => {
  const NFTFetcherContract = new caver.klay.Contract(NFTFetcher, NFTFETHCERADDRESS);
  const myNFTIdsArray = await NFTFetcherContract.methods.getTokenIdsOf(NFTAddress, myAddress, 0, balance).call();
  return myNFTIdsArray.length ? myNFTIdsArray : []
}

const getNFTsAddressOfIds = async (projectContract: any, myNFTs: string[]) => {
  const url = myNFTs.map(async tokenId => await projectContract.methods.tokenURI(tokenId).call())
  return Promise.all(url);
}

const myNFTsInfo = async (address: string, myNFTsAddresses: string[], network: string) => {
  try {
    const urls = myNFTsAddresses.join(' ')
    const res = await axios.post(`${BASEURL}/nft/metadata`,
      {
        address,
        url: urls,
        network,
      });
    return res.data
  } catch (e) {
    console.error(e);
    return []
  }
}

export const findBeforeNFT = async (address: string, network: string) => {
  try {
    const res = await axios.get(`${BASEURL}/nft/metadata?address=${address}&network=${network}`);
    return res.data
  } catch (e) {
    console.error(e);
    return []
  }
}

export const deleteMyNFT = async (id: number) => {
  try {
    const res = await axios.delete(`${BASEURL}/nft/metadata?id=${id}`);
    console.log(res, 'res!!')
    return res.data
  } catch (e) {
    console.error(e);
    return []
  }
}
