interface HeroProps {
  onTryFreeClick: () => void
  onBookDemoClick: () => void
}

export default function Hero({ onTryFreeClick, onBookDemoClick }: HeroProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
              AI-Native Data Migration Automation
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              The autonomous engine for your data migration.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              MINE turns data migration from a labor-driven service into an autonomous, reusable product. Cut time and cost by 50–70% while reducing go-live risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button
                onClick={onTryFreeClick}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Get started for free
              </button>
              <button
                onClick={onBookDemoClick}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between mb-8 gap-2">
                {/* Source Systems */}
                <div className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg p-3 sm:p-4 min-w-0">
                  <div className="text-xs font-semibold text-slate-700 mb-2 sm:mb-3">Source systems</div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600">Salesforce</div>
                    <div className="text-xs text-slate-600">SAP</div>
                    <div className="text-xs text-slate-600">Oracle</div>
                    <div className="text-xs text-slate-600">NetSuite</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="mx-1 sm:mx-2 text-slate-400 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* MINE */}
                <div className="flex-1 bg-indigo-600 text-white rounded-lg p-3 sm:p-4 text-center min-w-0">
                  <div className="text-sm sm:text-lg font-bold">MINE</div>
                </div>

                {/* Arrow */}
                <div className="mx-1 sm:mx-2 text-slate-400 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Target Systems */}
                <div className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg p-3 sm:p-4 min-w-0">
                  <div className="text-xs font-semibold text-slate-700 mb-2 sm:mb-3">Target systems</div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600">Modern stack</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Multi-agent engine for schema understanding, mapping, ETL, and validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

