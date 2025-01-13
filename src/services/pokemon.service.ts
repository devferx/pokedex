import axios from 'axios'

import { adaptRawPokemon } from '@/adapters/adapt-raw-pokemon'

import { getPokemonImage } from '@/utils/get-pokemon-image'

import type { Pokemon } from '@/models/pokemon'
import type { PokemonOverview } from '@/models/pokemon-overview'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'
import type { PokemonMoveResponse } from '@/interfaces/get-pokemon-move-response'
import type { GetPokemonTypesResponse } from '@/interfaces/get-pokemon-types-response'
import type { GetPokemonsResponse } from '@/interfaces/get-pokemons-response'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const getPokemonsOverview = async (
  limit = 20,
  offset = 0,
): Promise<PokemonOverview[]> => {
  const { data } = await pokeApi.get<GetPokemonsResponse>('/pokemon', {
    params: { limit, offset },
  })

  const pokemons = adaptRawPokemon(data.results)
  return pokemons
}

export const getPokemonOverviewByPage = async (
  page: number,
  itemsPerPage = 30,
): Promise<PokemonOverview[]> => {
  const limit = itemsPerPage
  const offset = (page - 1) * limit

  const pokemons = await getPokemonsOverview(limit, offset)
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

// TODO: create a adapter for the formatted pokemons
export const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> => {
  const pokemons = await getPokemonsOverview(limit, offset)
  const pokemonFetchTasks = pokemons.map(async (pokemon) =>
    getSinglePokemon(pokemon.name),
  )

  const detailedPokemons = await Promise.all(pokemonFetchTasks)
  const formattedPokemons = detailedPokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map(({ type }) => type.name),
    imageSrc: getPokemonImage(pokemon.id),
  }))

  return formattedPokemons
}

export const getPokemonsByPage = async (
  page: number,
  itemsPerPage = 30,
): Promise<Pokemon[]> => {
  const limit = itemsPerPage
  const offset = (page - 1) * limit

  const pokemons = await getPokemons(limit, offset)
  return pokemons
}

export const getPokemonTypes = async () => {
  const { data } = await pokeApi.get<GetPokemonTypesResponse>('/type')
  return data.results
}
