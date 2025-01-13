import { capitalize, capitalizeHyphenatedString } from '@/utils/string'

import type { PokemonDetailsResponse } from '@/interfaces/get-pokemon-details-response'
import { GetPokemonSpeciesResponse } from '@/interfaces/get-pokemon-species-response'

interface Props {
  pokemon: PokemonDetailsResponse
  pokemonSpecies: GetPokemonSpeciesResponse
}

export const PokemonDetails: React.FC<Props> = ({
  pokemon,
  pokemonSpecies,
}) => {
  const details = [
    { title: 'Height', value: `${pokemon.height} m` },
    { title: 'Weight', value: `${pokemon.weight} Kg` },
    {
      title: 'Abilities',
      value: pokemon.abilities
        .map(({ ability }) => capitalize(ability.name))
        .join(', '),
    },
    {
      title: 'Capture Rate',
      value: `${pokemonSpecies.capture_rate} %`,
    },
    {
      title: 'Color',
      value: capitalize(pokemonSpecies.color.name),
    },
    {
      title: 'Habitat',
      value: capitalize(pokemonSpecies.habitat?.name ?? 'Unknown'),
    },
    {
      title: 'Shape',
      value: capitalize(pokemonSpecies.shape.name),
    },
    {
      title: 'Growth Rate',
      value: capitalize(pokemonSpecies.growth_rate.name),
    },
    {
      title: 'Base Experience',
      value: pokemon.base_experience,
    },
    {
      title: 'Base Happiness',
      value: pokemonSpecies.base_happiness,
    },
    {
      title: 'Generation',
      value: capitalizeHyphenatedString(
        capitalize(pokemonSpecies.generation.name),
      ),
    },
    {
      title: 'Egg Groups',
      value: pokemonSpecies.egg_groups
        .map(({ name }) => capitalize(name))
        .join(', '),
    },
  ]

  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {details.map(({ title, value }) => (
        <div key={title}>
          <span className="font-bold">{title}:</span> {value}
        </div>
      ))}
    </div>
  )
}
