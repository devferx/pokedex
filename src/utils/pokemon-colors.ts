import type { Type } from '@/interfaces/get-pokemon-details-response'

const COLORS = {
  bug: '#97A51D',
  dark: '#644E40',
  dragon: '#5E1DF7',
  electric: '#F6C913',
  fairy: '#E87890',
  fighting: '#AE2A24',
  fire: '#ED6D12',
  flying: '#8E6FEB',
  ghost: '#644E88',
  grass: '#69C23D',
  ground: '#DBB54D',
  ice: '#7ECECE',
  normal: '#9C9C63',
  poison: '#923A92',
  psychic: '#F73670',
  rock: '#A48F32',
  steel: '#A0A0C0',
  water: '#4578ED',
}

export const getColorByType = (type: string) => {
  const key = type.toLowerCase() as keyof typeof COLORS
  const color = COLORS[key] ?? '#000000'
  return color
}

export const getPokemonColorsByTypes = (types: Type[] | string[]) => {
  const typesNames =
    Array.isArray(types) && typeof types[0] === 'string'
      ? (types as string[])
      : (types as Type[]).map(({ type }) => type.name)

  const colors = typesNames.map((type) => getColorByType(type))

  const primaryColor = colors[0]
  const secondaryColor = colors[1] ?? null

  const background =
    colors.length > 1
      ? `linear-gradient(90deg, ${colors.map((color) => `${color} 50%`).join(', ')})`
      : colors[0]

  return {
    primaryColor,
    secondaryColor,
    background,
  }
}
