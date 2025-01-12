'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { PokemonCard } from '@/domains/home/components/pokemon-card'

import type { Pokemon } from '@/models/pokemon'
import { useDebounce } from '../hooks/use-debounce'

interface Props {
  pokemons: Pokemon[]
}

export const SearchView = ({ pokemons }: Props) => {
  const [query, setQuery] = useState('')
  const { debouncedValue } = useDebounce(query, 500)

  const queryIsEmpty = debouncedValue.trim().length === 0

  const filteredPokemons = queryIsEmpty
    ? []
    : pokemons.filter((pokemon) =>
        pokemon.name
          .toLocaleLowerCase()
          .includes(debouncedValue.toLocaleLowerCase()),
      )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <section className="mt-5">
      <Input
        placeholder="Search a Pokemon..."
        value={query}
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
