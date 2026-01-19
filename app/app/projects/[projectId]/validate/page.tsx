'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { CheckCircle2, AlertTriangle, AlertCircle } from '@/components/icons'
import IssueCard from '@/components/validate/IssueCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockIssues, mockValidationSummary } from '@/lib/mock/projects'
import { Issue } from '@/lib/types'

export default function ValidatePage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [summary, setSummary] = useState(mockValidationSummary)

  const handleApplyFix = (issueId: string) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, state: 'fixed' } : issue
    ))
    // Update summary
    const issue = issues.find(i => i.id === issueId)
    if (issue) {
      if (issue.severity === 'blocking') {
        setSummary({ ...summary, blocking: summary.blocking - 1, ready: summary.ready + 1 })
      } else {
        setSummary({ ...summary, warnings: summary.warnings - 1, ready: summary.ready + 1 })
      }
    }
  }

  const handleAcceptRisk = (issueId: string) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, state: 'accepted' } : issue
    ))
    // Update summary
    const issue = issues.find(i => i.id === issueId)
    if (issue) {
      if (issue.severity === 'blocking') {
        setSummary({ ...summary, blocking: summary.blocking - 1 })
      } else {
        setSummary({ ...summary, warnings: summary.warnings - 1 })
      }
    }
  }

  const handleGenerateReport = () => {
    router.push(`/app/projects/${projectId}/outputs`)
  }

  const openIssues = issues.filter(issue => issue.state === 'open')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Validation & Issues</h1>

      {/* Summary Cards */}
      <div className="flex gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{summary.ready}</div>
                <div className="text-sm text-green-600">Ready</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{summary.warnings}</div>
                <div className="text-sm text-yellow-600">Warnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{summary.blocking}</div>
                <div className="text-sm text-red-600">Blocking Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Data Issues */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Source Data Issues</h2>
          <span className="text-sm text-gray-500">{openIssues.length} issues</span>
        </div>

        <div className="space-y-4">
          {openIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onApplyFix={() => handleApplyFix(issue.id)}
              onAcceptRisk={() => handleAcceptRisk(issue.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={handleGenerateReport}>
          Generate Readiness Report
        </Button>
      </div>
    </div>
  )
}
