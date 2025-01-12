import { useEffect, useState } from 'react'

export const useDebounce = (value: string, debounceDelay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceDelay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, debounceDelay])

  return { debouncedValue }
}
