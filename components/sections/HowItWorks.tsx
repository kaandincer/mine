'use client'

import { useState } from 'react'

interface HowItWorksProps {
  onTryFreeClick: () => void
}

const steps = [
  {
    title: 'Schema understanding',
    description: 'Agents scan source systems and learn tables, keys, and relationships.',
    bullets: [
      'Map entities and dependencies automatically.',
      'Spot duplicates and anomalies.',
    ],
  },
  {
    title: 'Auto-mapping & transformation',
    description: 'MINE proposes and refines field-level mappings into your target model.',
    bullets: [
      'Generate mapping specs automatically.',
      'Surface ambiguous mappings for human review.',
    ],
  },
  {
    title: 'Cleansing & standardization',
    description: 'Cleansing becomes a reusable layer instead of one-off scripts.',
    bullets: [
      'Address normalization and picklist alignment.',
      'Dedupe, merge, and fix referential integrity.',
    ],
  },
  {
    title: 'Generated ETL & loaders',
    description: 'MINE outputs production-ready SQL, Python, or API-based loaders.',
    bullets: [
      'Run in your environment or MINE\'s runtime.',
      'Parameterize for dev, test, and prod.',
    ],
  },
  {
    title: 'Validation, reconciliation & delta',
    description: 'Multi-agent validation ensures safe loads and smooth deltas.',
    bullets: [
      'Detect constraint issues and data drift.',
      'Handle schema changes and delta migrations.',
    ],
  },
]

export default function HowItWorks({ onTryFreeClick }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            How MINE works end-to-end
          </h2>
          <p className="text-lg text-slate-600">
            An autonomous, multi-agent workflow across the migration lifecycle.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center border-b border-slate-200">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeStep === index
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {index + 1}. {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="bg-slate-50 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {steps[activeStep].title}
          </h3>
          <p className="text-lg text-slate-600 mb-6">
            {steps[activeStep].description}
          </p>
          <ul className="space-y-2">
            {steps[activeStep].bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start text-slate-600">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Result Strip */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <p className="text-center text-slate-900 font-medium">
            <span className="font-bold">Result:</span> migrations in weeks, not months — with 50–70% lower cost and dramatically reduced risk.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onTryFreeClick}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}

