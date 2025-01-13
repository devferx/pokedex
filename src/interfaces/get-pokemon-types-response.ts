export interface GetPokemonTypesResponse {
  count: number
  next: string
  previous: null
  results: TypeOverview[]
}

export interface TypeOverview {
  name: string
  url: string
}
