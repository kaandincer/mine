export default function Differentiation() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Why MINE is different
          </h2>
          <p className="text-lg text-slate-600">
            Not another ETL tool. Not another consulting project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Consultant-driven */}
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Consultant-driven migrations
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>One-off mapping specs in decks and spreadsheets.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Knowledge locked in people, not in a product.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Teams rebuilt for every program and re-migration.</span>
              </li>
            </ul>
          </div>

          {/* Legacy ETL */}
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Legacy ETL & data tools
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Rule-based, not agent-native.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Manual schema and mapping management.</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Validation bolted on at the end.</span>
              </li>
            </ul>
          </div>

          {/* MINE */}
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              MINE
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Autonomous multi-agent migration engine.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>AI-led schema understanding and mapping.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Auto-generated ETL in SQL, Python, or APIs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Validation engine that fixes issues before they break downstream.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-slate-600 italic">
          Built to make migrations as routine as deploying a modern web service.
        </p>
      </div>
    </section>
  )
}

