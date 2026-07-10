import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

import Chatbot from '@/components/Chatbot'
import MobileMotionProvider from '@/components/MobileMotionProvider'
import ScrollProgress from '@/components/ScrollProgress'
import { brand } from '@/lib/brand'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${brand.name} - ${brand.tagline}`,
  description: 'Ker & Co. Business Group is a diversified Ethiopian business group with ventures spanning FMCG distribution, paper products, hospitality, wellness, real estate, mining, agriculture, and export growth.',
  keywords: 'Ker & Co. Business Group, Ethiopia business group, hospitality Ethiopia, real estate Ethiopia, agriculture export Ethiopia, mining Ethiopia, paper products distribution',
  authors: [{ name: brand.name }],
  robots: 'index, follow',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: `${brand.name} - ${brand.tagline}`,
    description: 'Discover the story and the ventures of Ker & Co. Business Group across distribution, hospitality, real estate, mining, agriculture, and export.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: brand.logoPath,
    shortcut: brand.logoPath,
    apple: brand.logoPath,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">

        <MobileMotionProvider>
          <ScrollProgress />
          {children}
          <Chatbot />
        </MobileMotionProvider>
      </body>
    </html>
  )
}
