import Link from 'next/link'

import { Pagination } from '@/domains/home/components/pagination'

import { PokemonCard } from '@/domains/home/components/pokemon-card'
import { getPokemonByPage } from '@/services/pokemon.service'

interface Props {
  searchParams: Promise<{ page: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = isNaN(Number(page)) ? 1 : Number(page)
  const pokemons = await getPokemonByPage(currentPage)

  return (
    <main className="container mx-auto my-5">
      <section className="grid grid-cols-6 gap-4">
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
