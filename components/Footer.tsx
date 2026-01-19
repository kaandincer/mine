export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <img 
              src="/Mine Logo no background.png" 
              alt="MINE" 
              className="h-5 w-auto opacity-70"
            />
            <span>© {currentYear} MINE.</span>
          </div>
          <div className="flex gap-6 items-center">
            <a
              href="https://calendly.com/trymine-info/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Book a Demo
            </a>
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

