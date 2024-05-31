import { getPokemons } from './services/pokemon.service'
import { useQuery } from '@tanstack/react-query'

export const HomePage = () => {
  const { isLoading, data: pokemons } = useQuery({
    queryKey: ['getPokemons'],
    queryFn: getPokemons,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <section className="container mx-auto">
      <h1>Home</h1>
      <div className="grid grid-cols-4">
        {pokemons!.map((pokemon) => (
          <div key={pokemon.name} className="flex flex-col items-center">
            <img src={pokemon.img} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
