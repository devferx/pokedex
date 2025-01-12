import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useUpdateSearchQuery = (searchQuery: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('query', searchQuery)

    const newUrl = `${pathname}?${newSearchParams.toString()}`
    router.replace(newUrl)
  }, [searchQuery, pathname, router, searchParams])
}
