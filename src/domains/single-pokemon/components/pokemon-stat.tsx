'use client'

import { Progress } from '@/components/ui/progress'

import type { Stat as StatI } from '@/interfaces/get-pokemon-details-response'
import { useProgressCounter } from '../hooks/use-progress-counter'

const MAX_STAT_LENGTH = 255

interface Props {
  stat: StatI
  color?: string
}

export const PokemonStat: React.FC<Props> = ({ stat, color = '#0000' }) => {
  const { currentValue } = useProgressCounter(stat.base_stat)
  const progresValue = (currentValue / MAX_STAT_LENGTH) * 100

  return (
    <div>
      <p className="text-lg">
        <span className="font-bold capitalize">{stat.stat.name}</span>{' '}
        <span>{currentValue}</span>
      </p>

      <Progress value={progresValue} color={color} />
    </div>
  )
}
