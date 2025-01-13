import Image from 'next/image'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/domains/home/components/badge'

import { getPokemonColorsByTypes } from '@/utils/pokemon-colors'

import type { Pokemon } from '@/models/pokemon'

interface Props {
  pokemon: Pokemon
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const { background } = getPokemonColorsByTypes(pokemon.types)

  return (
    <Card className="overflow-hidden">
      <div className="h-fit w-full" style={{ background }}>
        <Image
          className="w-full"
          src={pokemon.imageSrc}
          alt={pokemon.name}
          width={250}
          height={250}
        />
      </div>

      <CardContent className="flex-col p-3">
        <CardTitle className="mx-auto text-lg capitalize">
          {pokemon.name}
        </CardTitle>
        <div className="mt-2 flex gap-1">
          {pokemon.types.map((type) => (
            <Badge key={type} type={type} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
