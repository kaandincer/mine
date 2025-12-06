'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Who is MINE for?',
    answer: 'Transformation leaders, data migration leads, and enterprise IT teams running complex ERP and CRM programs.',
  },
  {
    question: 'Which systems does MINE support?',
    answer: 'Salesforce, SAP, Oracle, NetSuite, and SQL-based sources to start, with more connectors planned.',
  },
  {
    question: 'Where does MINE run?',
    answer: 'You can run generated ETL in your own environment or use MINE\'s secure runtime.',
  },
  {
    question: 'Is MINE a consulting service?',
    answer: 'No. MINE is a full-stack, AI-native migration product that can work alongside your SI or internal team.',
  },
  {
    question: 'How early can we get access?',
    answer: 'We\'re building with a small group of design partners. Join the waitlist for early access.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                <span className="text-slate-400 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-50 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

