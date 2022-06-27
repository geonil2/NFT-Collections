export interface NFT {
  id: number,
  name: string,
  image: string,
  description: string,
  animation?: string,
  attribute: Attribute,
}

export type Attribute = {
  trait_type: string,
  value: string | number
}
