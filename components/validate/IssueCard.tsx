'use client'

import { AlertCircle, AlertTriangle } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Issue } from '@/lib/types'

interface IssueCardProps {
  issue: Issue
  onApplyFix: () => void
  onAcceptRisk: () => void
}

export default function IssueCard({ issue, onApplyFix, onAcceptRisk }: IssueCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {issue.severity === 'blocking' ? (
              <AlertCircle className="h-5 w-5 text-red-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
            <Badge variant={issue.severity}>{issue.severity === 'blocking' ? 'Blocking' : 'Warning'}</Badge>
            <span className="font-medium text-gray-900">{issue.fieldPath}</span>
          </div>

          <p className="text-sm text-gray-700">{issue.description}</p>

          <p className="text-sm text-gray-500">Affected records: {issue.affectedRecords}</p>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="mb-2 text-sm font-medium text-gray-700">AI-Suggested Fix</div>
            <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              {issue.suggestedFix}
            </button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onApplyFix}>
              Apply Fix
            </Button>
            <Button variant="outline" size="sm" onClick={onAcceptRisk}>
              Accept Risk
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
