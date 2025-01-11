'use client'

import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getPokemonMove } from '@/services/pokemon.service'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from './badge'

import type { Move } from '@/interfaces/get-pokemon-details-response'
import type { PokemonMoveResponse } from '@/interfaces/get-pokemon-move-response'

import { capitalizeHyphenatedString } from '@/utils/string'

interface Props {
  moves: Move[]
}

export const PokemonMoves: React.FC<Props> = ({ moves }) => {
  const [currentAccordionValue, setCurrentAccordionValue] = useState<
    string | undefined
  >(undefined)

  const [currentMove, setCurrentMove] = useState<PokemonMoveResponse | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isLoading) return
    if (!currentAccordionValue) return

    const moveId = currentAccordionValue.split('/').at(-2)!
    getPokemonMove(moveId).then((data) => {
      setCurrentMove(data)
      setIsLoading(false)
    })
  }, [isLoading, currentAccordionValue])

  const onAccordionChange = (value: string) => {
    setCurrentAccordionValue(value)

    if (value) setIsLoading(true)
    else setTimeout(() => setCurrentMove(null), 0)
  }

  return (
    <Accordion
      className="w-full"
      type="single"
      collapsible
      value={currentAccordionValue}
      onValueChange={onAccordionChange}
    >
      {moves.map(({ move }) => (
        <AccordionItem value={move.url} key={move.name}>
          <AccordionTrigger>
            {capitalizeHyphenatedString(move.name)}
          </AccordionTrigger>
          <AccordionContent>
            {currentAccordionValue === move.url && (
              <div className="flex justify-around">
                {!isLoading ? (
                  <>
                    <Badge type={currentMove?.type.name ?? 'Normal'} />

                    <p>
                      <span className="font-bold">Accuracy:</span>{' '}
                      {currentMove?.accuracy}
                    </p>
                    <p>
                      <span className="font-bold">PP:</span> {currentMove?.pp}
                    </p>
                    <p>
                      <span className="font-bold">Power:</span>{' '}
                      {currentMove?.power ?? 'N/A'}
                    </p>
                  </>
                ) : (
                  <div className="animate-spin">
                    <LoaderCircle />
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
