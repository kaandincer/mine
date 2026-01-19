'use client'

import Link from 'next/link'

interface HeaderProps {
  onSignInClick?: () => void
}

export default function Header({ onSignInClick }: HeaderProps) {
  const handleSignInClick = () => {
    if (onSignInClick) {
      onSignInClick()
    } else {
      window.location.href = '/login'
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img 
              src="/Mine Logo no background.png" 
              alt="MINE - AI-Native Data Migration Automation" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-slate-900">MINE</span>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/login"
              onClick={handleSignInClick}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

