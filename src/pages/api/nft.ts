import axios, {AxiosInstance} from "axios";

export const getNFTsInfo = async (myNFTsAddresses: string[]) => {
  try {
    const urls = myNFTsAddresses.join(' ')
    const res = await axios.post(`http://127.0.0.1:8080/nft/metadata`, {url: urls});
    return res.data
  } catch (e) {
    console.error(e);
    return []
  }
}
