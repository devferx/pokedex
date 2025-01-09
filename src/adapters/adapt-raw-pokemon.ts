import type { RawPokemon } from '@/interfaces/get-pokemons-response'
import type { Pokemon } from '@/models/pokemon'

export const adaptRawPokemon = (results: RawPokemon[]): Pokemon[] => {
  const pokemons = results.map((pokemon): Pokemon => {
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
