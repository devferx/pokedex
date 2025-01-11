'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export interface Props {
  className?: string
}

export const BackButton: React.FC<Props> = ({ className = '' }) => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button className={className} onClick={handleClick}>
      <ArrowLeft color="white" size={32} strokeWidth={2} />
    </button>
  )
}
