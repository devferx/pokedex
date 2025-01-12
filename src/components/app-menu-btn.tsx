'use client'

import { Menu } from 'lucide-react'

import { useSidebar } from './ui/sidebar'

export const AppMenuBtn = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <button onClick={toggleSidebar}>
      <Menu />
    </button>
  )
}
