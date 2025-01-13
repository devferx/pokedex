import type { Metadata } from 'next'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Pokedex',
    default: 'Pokedex',
  },
  description: 'Pokedex',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
