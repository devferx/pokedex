import { Progress } from '@/components/ui/progress'
import { Stat as StatI } from '@/interfaces/get-pokemon-details-response'

interface Props {
  stat: StatI
  color?: string
}

export const Stat: React.FC<Props> = ({ stat, color = '#0000' }) => {
  return (
    <div>
      <p className="text-lg">
        <span className="font-bold capitalize">{stat.stat.name}</span>{' '}
        <span>{stat.base_stat}</span>
      </p>

      <Progress value={stat.base_stat} color={color} />
    </div>
  )
}
