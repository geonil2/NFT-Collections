import ERC721 from '../abis/ERC721.json';
import NFTFetcher from '../abis/NFTFetcher.json';
import axios from "axios";

export const getBalanceOfNFT = async (NFTAddress: string, myAddress: string) => {
  const caver = window.caver;

  if (typeof caver === 'undefined') {
    throw new Error('Kaikas does not installed');
  }

  const projectContract = new caver.klay.Contract(ERC721, NFTAddress);
  const balance = await projectContract.methods.balanceOf(myAddress).call();
  console.log(balance, 'balance')
  if(!balance) {
    return [];
  }

  const myNFTs = await getMyNFTIds(caver, NFTAddress, myAddress, balance);
  console.log(myNFTs, 'myNFTs')
  if(!myNFTs.length) {
    return [];
  }
  await myNFTsInfo(myNFTs, projectContract).then(res => console.log(res, 'myNFTsInfo'))
  return await myNFTsInfo(myNFTs, projectContract)
}

const getMyNFTIds = async (caver: any, NFTAddress: string, myAddress: string, balance: string) => {
  const NFTFetcherContract = new caver.klay.Contract(NFTFetcher, '0x8b615f543210d34c61708a55D41a8613B5959e5d');
  return await NFTFetcherContract.methods.getTokenIdsOf(NFTAddress, myAddress, 0, balance).call();
}

const myNFTsInfo = async (myNFTs: string[], projectContract: any) => {
  try {
    const myNFTdata = myNFTs.map(async (tokenId: string) => {
      const url = await projectContract.methods.tokenURI(tokenId).call();
      const metaData = await axios.post(`http://127.0.0.1:8080/nft/metadata`, {
        url: url
      });
      return metaData.data
    })

    const promiss = Promise.all(myNFTdata);
    return promiss;
  } catch (e) {
    console.error(e);
    return []
  }
}
