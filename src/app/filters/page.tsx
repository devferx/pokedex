import Link from 'next/link'

import { getPokemonsByType, getPokemonTypes } from '@/services/pokemon.service'

import { AppMenuBtn } from '@/components/app-menu-btn'
import { SelectPokemonTypes } from '@/domains/filters/components/select-pokemon-types'
import { PokemonCard } from '@/domains/search/components/pokemon-card'

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function FilterPokemonsPage({ searchParams }: Props) {
  const types = await getPokemonTypes()
  const { type } = await searchParams

  const pokemons = await getPokemonsByType(type)

  return (
    <main className="container mx-auto my-5 flex flex-col gap-2 px-5">
      <AppMenuBtn />
      <h2 className="text-2xl font-bold">Filter Pokemons</h2>
      <SelectPokemonTypes initialType={type} types={types} />
      <section className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 xl:grid-cols-6">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </section>
    </main>
  )
}
