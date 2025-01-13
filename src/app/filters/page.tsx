import { SelectPokemonTypes } from '@/domains/filters/components/select-pokemon-types'
import { getPokemonTypes } from '@/services/pokemon.service'

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function FilterPokemonsPage({ searchParams }: Props) {
  const types = await getPokemonTypes()
  const { type } = await searchParams

  console.log(type)

  return (
    <main className="container mx-auto my-5 px-5">
      <h2 className="text-2xl font-bold">Filter Pokemons</h2>
      <SelectPokemonTypes types={types} />
    </main>
  )
}
