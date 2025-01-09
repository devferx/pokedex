import axios from 'axios'

import type { GetPokemonsResponse } from '@/interfaces/get-pokemons-response'
import { Pokemon } from '@/models/pokemon'
import { adaptRawPokemon } from '@/adapters/adapt-raw-pokemon'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> => {
  const { data } = await pokeApi.get<GetPokemonsResponse>('/pokemon', {
    params: { limit, offset },
  })

  const pokemons = adaptRawPokemon(data.results)
  return pokemons
}
