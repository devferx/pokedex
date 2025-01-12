import { Pokemon } from '@/models/pokemon'

export const searchPokemonsByName = (query: string, pokemons: Pokemon[]) => {
  const queryIsEmpty = query.trim().length === 0

  const filteredPokemons = queryIsEmpty
    ? []
    : pokemons.filter((pokemon) => {
        const pokemonName = pokemon.name.toLocaleLowerCase()
        const queryLower = query.toLocaleLowerCase()
        return pokemonName.includes(queryLower)
      })

  return { queryIsEmpty, filteredPokemons }
}
