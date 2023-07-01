import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'

import background from '../../public/Background.svg'
import ecoletaLogo from '../../public/Logo.svg'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <head>
          <link 
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""/>
          <script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="" />
        </head>
        <body className={inter.className}>
          <div className='bg-slate-100 min-h-screen relative'>
            <div className='container mx-auto max-w-7xl'>
              <header className='container py-12'>
                <Image src={ecoletaLogo} alt="" />
              </header>
              <Image src={background} alt="" className='absolute bottom-0 right-0' />
              {children}
            </div>
          </div>
        </body>
      </html>
    </>
  )
}
