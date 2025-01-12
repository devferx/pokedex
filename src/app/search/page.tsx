import { getPokemons } from '@/services/pokemon.service'

import { AppMenuBtn } from '@/components/app-menu-btn'
import { SearchView } from '@/domains/search/views/search-view'

export default async function SearchPokemonPage() {
  const pokemons = await getPokemons(1000)

  return (
    <main className="container mx-auto my-5 px-5">
      <AppMenuBtn />
      <SearchView pokemons={pokemons} />
    </main>
  )
}
