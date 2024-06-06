import { usePokemons } from './hooks/use-pokemons'

import { PokemonCard, PokemonList } from './components'

export const HomePage = () => {
  const { pokemons, isLoading } = usePokemons()

  if (isLoading) return <div>Loading...</div>

  return (
    <section className="container mx-auto">
      <h1>Home</h1>

      <PokemonList>
        {pokemons!.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonList>
    </section>
  )
}
