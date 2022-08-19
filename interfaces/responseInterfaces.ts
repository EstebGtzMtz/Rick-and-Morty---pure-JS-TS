export interface IInfoResponse{
  info: IInfoFromFetch
  results: ICharacter[]
}

interface IInfoFromFetch {
  count: number
  pages: number
  next: string
  prev: null | string
}

interface ICharacter {
  id: number
  name: string
  gender: string
  image: string
  species: string
  status: string
  type: string
}