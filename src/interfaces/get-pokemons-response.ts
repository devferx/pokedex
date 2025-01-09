export interface GetPokemonsResponse {
  count: number
  next: string
  previous: null
  results: RawPokemon[]
}

export interface RawPokemon {
  name: string
  url: string
}
