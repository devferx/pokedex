import type { RawPokemon } from '@/interfaces/get-pokemons-response'
import type { PokemonOverview } from '@/models/pokemon-overview'

export const adaptRawPokemon = (results: RawPokemon[]): PokemonOverview[] => {
  const pokemons = results.map((pokemon): PokemonOverview => {
    const urlParts = pokemon.url.split('/')
    const id = urlParts.at(-2)!

    return {
      id,
      name: pokemon.name,
      imageSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    }
  })

  return pokemons
}
