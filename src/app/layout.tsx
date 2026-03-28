import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-georgia' })

export const metadata = {
  title: 'Gee Family Cabins - Mountain Retreats for Family Getaways',
  description: 'Book your perfect family mountain getaway at Gee Family Cabins. Cozy accommodations in a beautiful mountain setting starting at $100/night.',
  keywords: 'cabin rental, mountain retreat, family vacation, mountain cabins, Gee Family Cabins'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}