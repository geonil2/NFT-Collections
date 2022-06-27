const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
console.log(process)

export const Token = NOTION_TOKEN;
export const DatabaseId = NOTION_DATABASE_ID;

export const NFTFETHCERADDRESS = '0x8b615f543210d34c61708a55D41a8613B5959e5d';

export const NETWORK = [
  {
    id: 1,
    name: 'Klaytn',
    className: 'bg-red-600 text-white'
  }
]
