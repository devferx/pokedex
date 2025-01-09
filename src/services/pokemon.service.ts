import axios from 'axios'

import { adaptRawPokemon } from '@/adapters/adapt-raw-pokemon'

import type { GetPokemonsResponse } from '@/interfaces/get-pokemons-response'
import type { Pokemon } from '@/models/pokemon'

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

export const getPokemonByPage = async (
  page: number,
  itemsPerPage = 30,
): Promise<Pokemon[]> => {
  const limit = itemsPerPage
  const offset = (page - 1) * limit

  const pokemons = await getPokemons(limit, offset)
  return pokemons
}
