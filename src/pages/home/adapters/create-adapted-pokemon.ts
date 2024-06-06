import type { GetPokemonsResponse } from '../interfaces/pokemons-response'
import type { Pokemon } from '../models/pokemon'

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${idx + 1}.gif
export function createAdaptedPokemon(response: GetPokemonsResponse): Pokemon[] {
  const pokemons = response.results.map(
    (pokemon, idx): Pokemon => ({
      id: idx + 1,
      name: pokemon.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${idx + 1}.png`,
      url: pokemon.url,
    }),
  )

  return pokemons
}
