import Link from 'next/link'

import { getPokemonByPage } from '@/services/pokemon.service'

import { AppMenuBtn } from '@/components/app-menu-btn'
import { Pagination } from '@/domains/home/components/pagination'
import { PokemonCard } from '@/domains/home/components/pokemon-card'

interface Props {
  searchParams: Promise<{ page: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = isNaN(Number(page)) ? 1 : Number(page)
  const pokemons = await getPokemonByPage(currentPage)

  return (
    <main className="container mx-auto my-5 px-5">
      <AppMenuBtn />

      <section className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 xl:grid-cols-6">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </section>
      <Pagination totalPages={20} />
    </main>
  )
}
