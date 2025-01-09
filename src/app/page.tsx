import { getPokemons } from '@/services/pokemon.service'

export default async function Home() {
  const pokemons = await getPokemons()

  return (
    <section className="grid grid-cols-4">
      <pre>
        <code>{JSON.stringify(pokemons, null, 2)}</code>
      </pre>
    </section>
  )
}
