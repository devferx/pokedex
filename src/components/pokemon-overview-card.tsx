import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

import type { PokemonOverview } from '@/models/pokemon-overview'

interface Props {
  pokemon: PokemonOverview
}

export const PokemonOverviewCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full" src={pokemon.imageSrc} alt={pokemon.name} />
      </CardContent>
      <CardFooter>
        <CardTitle className="mx-auto capitalize">{pokemon.name}</CardTitle>
      </CardFooter>
    </Card>
  )
}
