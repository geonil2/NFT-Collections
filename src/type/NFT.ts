export interface NFT {
  id: number,
  address: string,
  url: string,
  network: string,
  name: string,
  image: string,
  description: string,
  animation?: string,
  attribute: Attribute[],
}

export type Attribute = {
  trait_type: string,
  value: string | number
}
