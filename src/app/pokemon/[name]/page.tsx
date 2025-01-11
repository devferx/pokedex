/* eslint-disable @next/next/no-img-element */

import { getSinglePokemon } from '@/services/pokemon.service'

import { BackButton } from '@/domains/single-pokemon/components/back-button'
import { Badge } from '@/domains/single-pokemon/components/badge'
import { Stat } from '@/domains/single-pokemon/components/stat'

import { PokemonDetails } from '@/domains/single-pokemon/components/pokemon-details'
import { Title } from '@/domains/single-pokemon/components/title'
import { getPokemonImage } from '@/utils/get-pokemon-image'

import { getPokemonColorsByTypes } from '@/utils/pokemon-colors'

interface Props {
  params: Promise<{ name: string }>
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params
  const pokemon = await getSinglePokemon(name)

  const { primaryColor, background } = getPokemonColorsByTypes(pokemon.types)
  const typesNames = pokemon.types.map((type) => type.type.name)

  return (
    <div
      className="relative flex h-screen w-full flex-col px-3 py-5"
      style={{ background }}
    >
      <BackButton />

      <div className="mx-auto mt-4 max-h-full w-full max-w-[600px] flex-1 overflow-y-scroll bg-white p-5">
        <header className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <img
              className="w-[300px]"
              src={getPokemonImage(pokemon.id)}
              alt={pokemon.name}
            />
            <audio
              className="w-full"
              src={pokemon.cries.latest}
              controls
            ></audio>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold capitalize">
              #{pokemon.id} {pokemon.name}
            </h2>
            <div className="flex gap-2">
              {typesNames.map((type) => (
                <Badge key={type} type={type} />
              ))}
            </div>

            <div className="flex flex-col">
              {pokemon.stats.map((stat) => (
                <Stat key={stat.stat.name} stat={stat} color={primaryColor} />
              ))}
            </div>
          </div>
        </header>

        <section className="mt-5">
          <Title bgColor={primaryColor}>Details</Title>
          <PokemonDetails pokemon={pokemon} />
        </section>

        <section className="mt-5">
          <Title bgColor={primaryColor}>Moves</Title>

          <ul>
            {pokemon.moves.map(({ move }) => (
              <li className="capitalize" key={move.name}>
                {move.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
