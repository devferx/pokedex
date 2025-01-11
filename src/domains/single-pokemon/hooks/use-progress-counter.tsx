import { useEffect, useState } from 'react'

export const useProgressCounter = (to: number, duration: number = 450) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const durationRatio = duration / to

    const interval = setInterval(() => {
      if (currentValue < to) {
        setCurrentValue((prev) => prev + 1)
      }
    }, durationRatio)

    return () => clearInterval(interval)
  }, [currentValue, to, duration])

  return {
    currentValue,
  }
}
