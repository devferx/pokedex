'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { TypeOverview } from '@/interfaces/get-pokemon-types-response'
import { capitalize } from '@/utils/string'

interface Props {
  types: TypeOverview[]
  initialType?: string
}

export const SelectPokemonTypes: React.FC<Props> = ({
  types,
  initialType = '',
}) => {
  const router = useRouter()

  const [currentType, setCurrentType] = useState(initialType)

  const onChange = (newValue: string) => {
    setCurrentType(newValue)
  }

  const onHandleClick = () => {
    if (currentType === '') router.push('/filters')
    else router.push(`/filters?type=${currentType}`)
  }

  return (
    <div className="flex gap-4">
      <Select value={currentType} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type.name} value={type.name}>
              {capitalize(type.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={onHandleClick}>Filter</Button>
    </div>
  )
}
