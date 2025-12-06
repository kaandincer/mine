interface FinalCTAProps {
  onSignUpClick: () => void
  onContactClick: () => void
}

export default function FinalCTA({ onSignUpClick, onContactClick }: FinalCTAProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Bring autonomy to your next migration
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Tell us about your upcoming program and we'll explore early access or design partnership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onSignUpClick}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Sign up for launch
          </button>
          <button
            onClick={onContactClick}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md hover:bg-white transition-colors font-medium"
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  )
}

