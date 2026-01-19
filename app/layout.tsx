import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MINE - AI-Native Data Migration Automation',
  description: 'The autonomous engine for your data migration. Cut time and cost by 50–70% while reducing go-live risk.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

