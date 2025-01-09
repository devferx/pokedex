/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { Pagination } from '@/domains/home/components/pagination'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
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
            <Card>
              <CardContent>
                <img
                  className="w-full"
                  src={pokemon.imageSrc}
                  alt={pokemon.name}
                />
              </CardContent>
              <CardFooter>
                <CardTitle className="mx-auto capitalize">
                  {pokemon.name}
                </CardTitle>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
      <Pagination totalPages={20} />
    </main>
  )
}
