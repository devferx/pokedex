import Image from 'next/image'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

import type { PokemonOverview } from '@/models/pokemon-overview'

interface Props {
  pokemon: PokemonOverview
}

export const PokemonOverviewCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        <Image
          className="w-full"
          src={pokemon.imageSrc}
          alt={pokemon.name}
          width={150}
          height={150}
        />
      </CardContent>
      <CardFooter>
        <CardTitle className="mx-auto capitalize">{pokemon.name}</CardTitle>
      </CardFooter>
    </Card>
  )
}
