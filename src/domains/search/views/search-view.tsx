'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { useDebounce } from '../hooks/use-debounce'

import { Input } from '@/components/ui/input'
import { PokemonCard } from '@/domains/home/components/pokemon-card'

import type { Pokemon } from '@/models/pokemon'

interface Props {
  pokemons: Pokemon[]
  query?: string
}

export const SearchView = ({ pokemons, query = '' }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [queryInput, setQueryInput] = useState(query)
  const { debouncedValue } = useDebounce(queryInput, 500)

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('query', debouncedValue)

    const newUrl = `${pathname}?${newSearchParams.toString()}`
    router.replace(newUrl)
  }, [debouncedValue, pathname, router, searchParams])

  const queryIsEmpty = debouncedValue.trim().length === 0
  const filteredPokemons = queryIsEmpty
    ? []
    : pokemons.filter((pokemon) =>
        pokemon.name
          .toLocaleLowerCase()
          .includes(debouncedValue.toLocaleLowerCase()),
      )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value)
  }

  return (
    <section className="mt-5">
      <Input
        placeholder="Search a Pokemon..."
        value={queryInput}
        onChange={handleSearch}
      />

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 xl:grid-cols-6">
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </section>
  )
}
