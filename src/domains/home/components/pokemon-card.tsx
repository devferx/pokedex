import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Pokemon } from '@/models/pokemon'

interface Props {
  pokemon: Pokemon
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
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
