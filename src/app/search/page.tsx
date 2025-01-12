import type { Metadata } from 'next'

import { getPokemons } from '@/services/pokemon.service'

import { AppMenuBtn } from '@/components/app-menu-btn'
import { SearchView } from '@/domains/search/views/search-view'

interface Props {
  searchParams: Promise<{ query: string }>
}

export const metadata: Metadata = {
  title: 'Search',
}

export default async function SearchPokemonPage({ searchParams }: Props) {
  const pokemons = await getPokemons(1000)
  const { query } = await searchParams

  return (
    <main className="container mx-auto my-5 px-5">
      <AppMenuBtn />
      <SearchView pokemons={pokemons} query={query} />
    </main>
  )
}
