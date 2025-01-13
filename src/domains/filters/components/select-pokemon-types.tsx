'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { TypeOverview } from '@/interfaces/get-pokemon-types-response'

interface Props {
  types: TypeOverview[]
}

export const SelectPokemonTypes: React.FC<Props> = ({ types }) => {
  const router = useRouter()

  const [currentType, setCurrentType] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentType(event.target.value)
  }

  const onHandleClick = () => {
    if (currentType === '') router.push('/filters')
    else router.push(`/filters?type=${currentType}`)
  }

  return (
    <div className="flex gap-4">
      <select className="capitalize" value={currentType} onChange={onChange}>
        <option value="">Select a type</option>
        {types.map((type) => (
          <option className="capitalize" key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <button onClick={onHandleClick}>Filter</button>
    </div>
  )
}
