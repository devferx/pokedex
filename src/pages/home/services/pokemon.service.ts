import { pokemonApi } from '@/api'

import { createAdaptedPokemon } from '../adapters/create-adapted-pokemon'

import type { Pokemon } from '../models/pokemon'
import type { GetPokemonsResponse } from '../interfaces/pokemons-response'

async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function getPokemons(): Promise<Pokemon[]> {
  await delay(2000)
  const { data } = await pokemonApi.get<GetPokemonsResponse>('/pokemon')
  const pokemons = createAdaptedPokemon(data)

  return pokemons
}
