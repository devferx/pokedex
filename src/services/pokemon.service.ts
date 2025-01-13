import axios from 'axios'

import { PokemonAdapter } from '@/adapters/pokemon.adapter'

import type { Pokemon } from '@/models/pokemon'
import type { PokemonOverview } from '@/models/pokemon-overview'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'
import type { PokemonMoveResponse } from '@/interfaces/get-pokemon-move-response'
import type { GetPokemonTypeResponse } from '@/interfaces/get-pokemon-type-reponse'
import type {
  GetPokemonTypesResponse,
  TypeOverview,
} from '@/interfaces/get-pokemon-types-response'
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

  const pokemons = PokemonAdapter.toPokemonOverview(data.results)
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

export const getPokemonsByOverviews = async (
  pokemonOverviews: PokemonOverview[],
): Promise<Pokemon[]> => {
  const pokemonFetchTasks = pokemonOverviews.map(async (pokemon) =>
    getSinglePokemon(pokemon.name),
  )

  const detailedPokemons = await Promise.all(pokemonFetchTasks)
  const pokemons = PokemonAdapter.toPokemon(detailedPokemons)

  return pokemons
}

export const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> => {
  const pokemonOverviews = await getPokemonsOverview(limit, offset)
  return getPokemonsByOverviews(pokemonOverviews)
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

export const getPokemonTypes = async (): Promise<TypeOverview[]> => {
  const { data } = await pokeApi.get<GetPokemonTypesResponse>('/type')
  const sortedTypes = data.results.sort((a, b) => a.name.localeCompare(b.name))

  return sortedTypes
}

export const getPokemonOverviewsByType = async (
  type?: string,
): Promise<PokemonOverview[]> => {
  if (!type) return []
  if (type === '') return []

  const { data } = await pokeApi.get<GetPokemonTypeResponse>(`/type/${type}`)

  const rawPokemons = data.pokemon.map(({ pokemon }) => pokemon)
  const pokemonOverviews = PokemonAdapter.toPokemonOverview(rawPokemons)

  return pokemonOverviews
}
