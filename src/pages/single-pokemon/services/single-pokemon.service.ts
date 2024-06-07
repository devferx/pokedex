import { pokemonApi } from '@/api'
import { GetSinglePokemonResponse } from '../interfaces'

export async function getSinglePokemon(
  id: string | number,
): Promise<GetSinglePokemonResponse> {
  const { data } = await pokemonApi.get<GetSinglePokemonResponse>(
    `/pokemon/${id}`,
  )

  return data
}
