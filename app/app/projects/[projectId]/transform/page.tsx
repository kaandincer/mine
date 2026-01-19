'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ChevronDown, Play } from '@/components/icons'
import FieldSelector from '@/components/transform/FieldSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { mockTransformSpecs } from '@/lib/mock/projects'

export default function TransformPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string
  const [selectedFieldId, setSelectedFieldId] = useState('3') // Type field
  const [description, setDescription] = useState(
    "e.g., Convert account type values to uppercase and map 'Prospect' to 'PROSPECT', 'Customer' to 'CUSTOMER', and any other values to 'OTHER'"
  )
  const [sql, setSql] = useState('')
  const [showSql, setShowSql] = useState(true)
  const [tested, setTested] = useState(false)
  const [testResults, setTestResults] = useState<{ before: string; after: string }[]>([])

  const transformSpec = mockTransformSpecs.find(ts => ts.mappingRowId === selectedFieldId)

  const handleGenerateTransform = () => {
    const generatedSql = `CASE
WHEN Type = 'Prospect' THEN 'PROSPECT'
WHEN Type = 'Customer' THEN 'CUSTOMER'
WHEN Type = 'Partner' THEN 'PARTNER'
ELSE 'OTHER'
END`
    setSql(generatedSql)
    setTested(false)
    setTestResults([])
  }

  const handleRunTest = () => {
    setTestResults([
      { before: 'Prospect', after: 'PROSPECT' },
      { before: 'Customer', after: 'CUSTOMER' },
      { before: 'Partner', after: 'PARTNER' },
    ])
    setTested(true)
  }

  const handleContinue = () => {
    router.push(`/app/projects/${projectId}/validate`)
  }

  const fieldName = selectedFieldId === '3' ? 'Account.Type → CUSTOMER_TYPE' : 'Account.Industry → INDUSTRY_CODE'

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transform Field</h1>
          <p className="mt-1 text-base text-gray-600">{fieldName}</p>
        </div>
        {tested && <Badge variant="tested">Tested</Badge>}
      </div>

      <div className="flex gap-6">
        {/* Left Pane: Field Selector */}
        <FieldSelector selectedFieldId={selectedFieldId} onFieldSelect={setSelectedFieldId} />

        {/* Right Pane: Transformation Workspace */}
        <div className="flex-1 space-y-6">
          {/* Describe Transform Card */}
          <Card>
            <CardHeader>
              <CardTitle>Describe how this field should be transformed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
                placeholder="Describe the transformation..."
              />
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleGenerateTransform}>
                  <span className="mr-2">⟳</span>
                  Generate Transform
                </Button>
                <Button variant="outline" onClick={() => setDescription('')}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated SQL Section */}
          {sql && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle>Generated SQL</CardTitle>
                    <Badge variant="aiGenerated">AI-Generated</Badge>
                  </div>
                  <button
                    onClick={() => setShowSql(!showSql)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showSql ? (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Hide SQL
                      </>
                    ) : (
                      'Show SQL'
                    )}
                  </button>
                </div>
              </CardHeader>
              {showSql && (
                <CardContent>
                  <pre className="rounded-lg bg-gray-100 p-4 text-sm font-mono text-gray-900">
                    {sql}
                  </pre>
                </CardContent>
              )}
            </Card>
          )}

          {/* Test Transformation Section */}
          {sql && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Test Transformation</CardTitle>
                  <Button variant="primary" size="sm" onClick={handleRunTest}>
                    <Play className="mr-2 h-4 w-4" />
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              {testResults.length > 0 && (
                <CardContent>
                  <div className="rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-2 text-left font-medium text-gray-700">Before</th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700">After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResults.map((result, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="px-4 py-2 text-gray-900">{result.before}</td>
                            <td className="px-4 py-2 text-gray-900">{result.after}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => {}}>
              Save Transformation
            </Button>
            <Button variant="primary" size="lg" onClick={handleContinue}>
              Continue to Validation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
