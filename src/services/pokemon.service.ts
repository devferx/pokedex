import axios from 'axios'

import { adaptRawPokemon } from '@/adapters/adapt-raw-pokemon'

import type { Pokemon } from '@/models/pokemon'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'
import type { PokemonMoveResponse } from '@/interfaces/get-pokemon-move-response'
import type { GetPokemonsResponse } from '@/interfaces/get-pokemons-response'

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

export const getSinglePokemon = async (name: string) => {
  const { data } = await pokeApi.get<PokemonDetailsResponse>(`/pokemon/${name}`)
  return data
}

export const getPokemonMove = async (name: string) => {
  const { data } = await pokeApi.get<PokemonMoveResponse>(`/move/${name}`)
  return data
}

export const getDetailedPokemons = async (
  limit = 20,
  offset = 0,
): Promise<PokemonDetailsResponse[]> => {
  const pokemons = await getPokemons(limit, offset)
  const pokemonFetchTasks = pokemons.map(async (pokemon) =>
    getSinglePokemon(pokemon.name),
  )

  const detailedPokemons = await Promise.all(pokemonFetchTasks)
  return detailedPokemons
}
