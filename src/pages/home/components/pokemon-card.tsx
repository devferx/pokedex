import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

import { Pokemon } from '../models/pokemon'

interface Props {
  pokemon: Pokemon
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <Card className="py-4" key={pokemon.id}>
        <CardBody className="overflow-visible py-2">
          <div className="bg-blue-200 rounded-xl">
            <Image
              className="object-cover"
              src={pokemon.img}
              alt="Card background"
              width={270}
            />
          </div>
        </CardBody>
        <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large capitalize text-center mx-auto">
            {pokemon.name}
          </h4>
        </CardFooter>
      </Card>
    </Link>
  )
}
