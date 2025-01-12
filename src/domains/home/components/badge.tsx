import { getColorByType } from '@/utils/pokemon-colors'

interface Props {
  type: string
}

export const Badge = ({ type }: Props) => {
  return (
    <div
      className="w-fit rounded px-1 text-sm font-bold capitalize text-white"
      style={{ backgroundColor: getColorByType(type) }}
    >
      {type}
    </div>
  )
}
