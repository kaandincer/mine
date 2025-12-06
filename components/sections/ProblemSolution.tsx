'use client'

interface ProblemSolutionProps {
  onHowItWorksClick: () => void
}

export default function ProblemSolution({ onHowItWorksClick }: ProblemSolutionProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3">
              The Problem
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Data migration slows down every transformation.
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Manual mapping and cleansing across endless spreadsheets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Brittle SQL and ETL jobs that constantly break.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Late data issues pushing back go-live dates.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">
              The Solution
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Turn migration into an autonomous workflow.
            </h2>
            <ul className="space-y-3 text-slate-600 mb-6">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Agents learn your schemas and infer business meaning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>MINE writes mappings, cleansing rules, and ETL for you.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Validation engine catches issues before they hit production.</span>
              </li>
            </ul>
            <button
              onClick={onHowItWorksClick}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              See how it works →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

