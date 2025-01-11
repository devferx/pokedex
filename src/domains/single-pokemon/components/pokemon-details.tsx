import { capitalize } from '@/utils/string'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'

interface Props {
  pokemon: PokemonDetailsResponse
}

export const PokemonDetails: React.FC<Props> = ({ pokemon }) => {
  const details = [
    { title: 'Height', value: `${pokemon.height} m` },
    { title: 'Weight', value: `${pokemon.weight} Kg` },
    {
      title: 'Abilities',
      value: pokemon.abilities
        .map(({ ability }) => capitalize(ability.name))
        .join(', '),
    },
  ]

  return (
    <div className="grid grid-cols-2">
      {details.map(({ title, value }) => (
        <div key={title}>
          <span className="font-bold">{title}:</span> {value}
        </div>
      ))}
    </div>
  )
}
