import { getPokemonTypes } from '@/services/pokemon.service'

export default async function FilterPokemonsPage() {
  const types = await getPokemonTypes()
  return (
    <main className="container mx-auto my-5 px-5">
      <h2 className="text-2xl font-bold">Filter Pokemons</h2>
      <pre>
        <code>{JSON.stringify(types, null, 2)}</code>
      </pre>
    </main>
  )
}
