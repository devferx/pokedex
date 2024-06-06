import { useQuery } from '@tanstack/react-query'
import { getPokemons } from '../services/pokemon.service'

export const usePokemons = () => {
  const { data: pokemons, ...getPokemonsQuery } = useQuery({
    queryKey: ['getPokemons'],
    queryFn: getPokemons,
    refetchOnWindowFocus: false,
  })

  return { pokemons, ...getPokemonsQuery }
}
