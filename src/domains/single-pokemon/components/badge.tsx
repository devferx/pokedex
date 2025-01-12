import { getColorByType } from '@/utils/pokemon-colors'

interface Props {
  type: string
}

export const Badge = ({ type }: Props) => {
  return (
    <div
      className="w-fit rounded-full px-2 font-bold capitalize text-white"
      style={{ backgroundColor: getColorByType(type) }}
    >
      {type}
    </div>
  )
}
