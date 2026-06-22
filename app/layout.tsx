import type { Metadata } from 'next'
import './globals.css'
import { ProductProvider } from '@/context/ProductContext'

export const metadata: Metadata = {
  title: 'PawMart – Everything Your Pet Needs',
  description: "India's friendliest pet store.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          {children}
        </ProductProvider>
      </body>
    </html>
  )
}
