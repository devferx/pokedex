'use client'

import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'

import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers'

interface Props {
  totalPages: number
}

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString)

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(`${pathname}`)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') return `${pathname}?${params.toString()}`

    if (Number(pageNumber) <= 0) return `${pathname}`

    if (Number(pageNumber) > totalPages)
      return `${pathname}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="mb-32 mt-10 flex justify-center text-center">
      <nav>
        <ul className="flex">
          <li>
            <Link
              className="relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <ChevronLeft />
            </Link>
          </li>
          {allPages.map((page, idx) => (
            <li key={`page-${page}-${idx}`}>
              <Link
                className={clsx(
                  'relative block rounded border-0 px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:text-gray-800 focus:shadow-none',
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white focus:shadow-md'
                    : 'bg-transparent hover:bg-gray-300',
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li>
            <a
              className="relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <ChevronRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
