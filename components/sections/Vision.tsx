interface VisionProps {
  onSignUpClick: () => void
}

export default function Vision({ onSignUpClick }: VisionProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            The vision
          </h2>
          <p className="text-xl text-slate-600 font-medium mb-8">
            Migration as a reusable product, not a one-off project.
          </p>
        </div>

        <div className="space-y-6 text-slate-600 mb-8">
          <p>
            Today, data migration is a labor-driven service with no compounding leverage.
          </p>
          <p>
            MINE turns mappings, rules, and transformations into a migration knowledge graph.
          </p>
          <p>
            Each program makes the platform smarter — so every future migration is faster, cheaper, and safer.
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <p className="text-slate-900 font-medium">
            Long-term, MINE becomes the autonomous layer that understands how data moves across your enterprise.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onSignUpClick}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Sign up for launch
          </button>
        </div>
      </div>
    </section>
  )
}

