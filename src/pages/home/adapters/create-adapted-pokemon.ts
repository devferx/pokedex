import type { GetPokemonsResponse } from '../interfaces/pokemons-response'
import type { Pokemon } from '../models/pokemon'

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png
export function createAdaptedPokemon(response: GetPokemonsResponse): Pokemon[] {
  const pokemons = response.results.map(
    (pokemon, idx): Pokemon => ({
      name: pokemon.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${idx + 1}.gif`,
      url: pokemon.url,
    }),
  )

  return pokemons
}
