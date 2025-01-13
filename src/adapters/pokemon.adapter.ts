import { getPokemonImage } from '@/utils/get-pokemon-image'

import type { Pokemon } from '@/models/pokemon'
import type { PokemonOverview } from '@/models/pokemon-overview'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'
import type { RawPokemon } from '@/interfaces/get-pokemons-response'

export class PokemonAdapter {
  public static toPokemonOverview(results: RawPokemon[]): PokemonOverview[] {
    const pokemons = results.map((pokemon): PokemonOverview => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2)!

      return {
        id,
        name: pokemon.name,
        imageSrc: getPokemonImage(id),
      }
    })

    return pokemons
  }

  public static toPokemon(
    detailedPokemons: PokemonDetailsResponse[],
  ): Pokemon[] {
    const pokemons = detailedPokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(({ type }) => type.name),
      imageSrc: getPokemonImage(pokemon.id),
    }))

    return pokemons
  }
}
