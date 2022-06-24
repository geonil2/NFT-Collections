const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
console.log(process)
export const Token = NOTION_TOKEN;
export const DatabaseId = NOTION_DATABASE_ID;

export const NETWORK = [
  {
    id: 1,
    name: 'Ethereum',
    className: 'bg-gray-700 text-white'
  },
  {
    id: 2,
    name: 'Klaytn',
    className: 'bg-red-600 text-white'
  }
]
