interface FooterProps {
  onContactClick: () => void
}

export default function Footer({ onContactClick }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 text-sm">
            © {currentYear} MINE.
          </div>
          <div className="flex gap-6 items-center">
            <button
              onClick={onContactClick}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </button>
            <a
              href="#"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Built for autonomous, AI-native data migration.
          </p>
        </div>
      </div>
    </footer>
  )
}

