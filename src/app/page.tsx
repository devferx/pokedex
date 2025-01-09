/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { Pagination } from '@/components/pagination'
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
            <article className="flex flex-col items-center rounded border border-gray-500 p-4">
              <img
                className="w-full"
                src={pokemon.imageSrc}
                alt={pokemon.name}
              />
              <p className="capitalize">{pokemon.name}</p>
            </article>
          </Link>
        ))}
      </section>
      <Pagination totalPages={20} />
    </main>
  )
}
