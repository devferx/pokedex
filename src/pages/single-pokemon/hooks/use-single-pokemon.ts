import { useQuery } from '@tanstack/react-query'
import { getSinglePokemon } from '../services/single-pokemon.service'

export const useSinglePokemon = (id: string) => {
  const { data: pokemon, ...getSinglePokemonQuery } = useQuery({
    queryKey: ['get-single-pokemon', id],
    queryFn: () => getSinglePokemon(id),
  })

  return {
    pokemon,
    ...getSinglePokemonQuery,
  }
}
