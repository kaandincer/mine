'use client'

interface HeaderProps {
  onSignUpClick: () => void
  onContactClick: () => void
}

export default function Header({ onSignUpClick, onContactClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-slate-900">MINE</div>
          <div className="flex gap-3">
            <button
              onClick={onContactClick}
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              Contact us
            </button>
            <button
              onClick={onSignUpClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign up for launch
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

