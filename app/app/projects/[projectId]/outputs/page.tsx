'use client'

import { FileText, Database, FileCheck } from '@/components/icons'
import OutputCard from '@/components/outputs/OutputCard'

export default function OutputsPage() {
  const handleDownload = (format: string, filename: string) => {
    const content = `Mock ${format.toUpperCase()} content for ${filename}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      // Could show a toast here
      alert('Copied to clipboard!')
    })
  }

  const generatedTime = '2026-01-18 14:23:15'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Outputs</h1>
        <p className="mt-1 text-base text-gray-600">Download migration artifacts and documentation</p>
      </div>

      <div className="space-y-4">
        <OutputCard
          title="Mapping File"
          description="Complete field-to-field mapping specification"
          version="1.0"
          generated={generatedTime}
          icon={<FileText className="h-6 w-6 text-gray-600" />}
          actions={[
            {
              label: 'Download CSV',
              format: 'csv',
              onClick: () => handleDownload('csv', 'mapping.csv'),
            },
            {
              label: 'Download JSON',
              format: 'json',
              onClick: () => handleDownload('json', 'mapping.json'),
            },
            {
              label: 'Copy to Clipboard',
              format: 'copy',
              onClick: () => handleCopy('{"mappings": []}'),
            },
          ]}
        />

        <OutputCard
          title="Transformation Specs"
          description="SQL transformations and human-readable documentation"
          version="1.0"
          generated={generatedTime}
          icon={<Database className="h-6 w-6 text-gray-600" />}
          actions={[
            {
              label: 'Download SQL',
              format: 'sql',
              onClick: () => handleDownload('sql', 'transformations.sql'),
            },
            {
              label: 'Download PDF',
              format: 'pdf',
              onClick: () => handleDownload('pdf', 'transformations.pdf'),
            },
            {
              label: 'Copy to Clipboard',
              format: 'copy',
              onClick: () => handleCopy('SELECT * FROM transformations'),
            },
          ]}
        />

        <OutputCard
          title="Migration Readiness Report"
          description="Executive summary with validation results and risk assessment"
          version="1.0"
          generated={generatedTime}
          icon={<FileCheck className="h-6 w-6 text-gray-600" />}
          actions={[
            {
              label: 'Download PDF',
              format: 'pdf',
              onClick: () => handleDownload('pdf', 'readiness-report.pdf'),
            },
            {
              label: 'Download DOCX',
              format: 'docx',
              onClick: () => handleDownload('docx', 'readiness-report.docx'),
            },
            {
              label: 'Copy to Clipboard',
              format: 'copy',
              onClick: () => handleCopy('Migration Readiness Report Summary'),
            },
          ]}
        />
      </div>
    </div>
  )
}
