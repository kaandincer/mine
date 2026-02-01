'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CursorTabs } from '@/components/CursorTabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, XCircle } from '@/components/icons'

type Severity = 'blocking' | 'warning' | 'ready'

interface Issue {
  id: string
  severity: Severity
  field: string
  description: string
  affectedRecords: number
  aiSuggestedFix?: string
}

interface TabData {
  blocking: number
  warnings: number
  ready: number
  issues: Issue[]
}

export default function DataQualityPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const [activeTab, setActiveTab] = useState('source-data')

  const tabs = [
    { id: 'source-data', label: 'Source Data' },
    { id: 'in-flight-data', label: 'In-flight Data' },
    { id: 'target-data', label: 'Target Data' },
  ]

  // Mock data for each tab
  const sourceData: TabData = {
    blocking: 2,
    warnings: 3,
    ready: 0,
    issues: [
      {
        id: '1',
        severity: 'blocking',
        field: 'Account.Id',
        description: 'Null values in non-nullable field',
        affectedRecords: 45,
        aiSuggestedFix: 'Filter out records with null Id values or assign default values',
      },
      {
        id: '2',
        severity: 'blocking',
        field: 'Contact.AccountId',
        description: 'Referential integrity violation: orphaned contacts',
        affectedRecords: 12,
        aiSuggestedFix: 'Remove orphaned contacts or assign to default account',
      },
      {
        id: '3',
        severity: 'warning',
        field: 'Contact.Email',
        description: 'Invalid email format detected',
        affectedRecords: 89,
        aiSuggestedFix: 'Apply email validation regex and clean invalid entries',
      },
      {
        id: '4',
        severity: 'warning',
        field: 'Account.AnnualRevenue',
        description: 'Precision issues: values exceed DECIMAL(18,2) limit',
        affectedRecords: 23,
        aiSuggestedFix: 'Truncate or round values to fit target precision',
      },
      {
        id: '5',
        severity: 'warning',
        field: 'Opportunity.Amount',
        description: 'Negative values in amount field',
        affectedRecords: 5,
        aiSuggestedFix: 'Convert negative values to positive or flag for review',
      },
    ],
  }

  const inFlightData: TabData = {
    blocking: 1,
    warnings: 2,
    ready: 0,
    issues: [
      {
        id: '6',
        severity: 'blocking',
        field: 'CUSTOMER.CUSTOMER_ID',
        description: 'Source ID length (18 chars) exceeds target field limit (10 chars)',
        affectedRecords: 156,
        aiSuggestedFix: 'Truncate IDs to 10 characters or hash to fit target schema',
      },
      {
        id: '7',
        severity: 'warning',
        field: 'CONTACT_PERSON.FIRST_NAME',
        description: 'Case inconsistency: mixed case in target expects uppercase',
        affectedRecords: 234,
        aiSuggestedFix: 'Apply UPPER() transformation to all first names',
      },
      {
        id: '8',
        severity: 'warning',
        field: 'CUSTOMER.INDUSTRY_CODE',
        description: 'Missing industry code mappings for 12 source values',
        affectedRecords: 12,
        aiSuggestedFix: 'Create mapping table for unmapped industry codes',
      },
    ],
  }

  const targetData: TabData = {
    blocking: 0,
    warnings: 1,
    ready: 1,
    issues: [
      {
        id: '9',
        severity: 'warning',
        field: 'CUSTOMER.CUSTOMER_TYPE',
        description: 'Post-load validation: referential integrity warning',
        affectedRecords: 8,
        aiSuggestedFix: 'Review and fix referential integrity constraints',
      },
      {
        id: '10',
        severity: 'ready',
        field: 'CONTACT_PERSON',
        description: 'All validations passed',
        affectedRecords: 0,
      },
    ],
  }

  const getTabData = (): TabData => {
    switch (activeTab) {
      case 'source-data':
        return sourceData
      case 'in-flight-data':
        return inFlightData
      case 'target-data':
        return targetData
      default:
        return sourceData
    }
  }

  const tabData = getTabData()

  const getTabConfig = () => {
    switch (activeTab) {
      case 'source-data':
        return {
          title: 'Source System Issues',
          subtitle: 'Issues detected in source systems before transformation',
        }
      case 'in-flight-data':
        return {
          title: 'In-flight Transformation Issues',
          subtitle: 'Issues in transformed, pre-load data',
        }
      case 'target-data':
        return {
          title: 'Target System Validation',
          subtitle: 'Post-load validation, drift detection, and ongoing reconciliation',
        }
      default:
        return { title: '', subtitle: '' }
    }
  }

  const config = getTabConfig()

  const handleApplyFix = (issueId: string) => {
    console.log('Apply fix for issue:', issueId)
    // TODO: Wire to backend
  }

  const handleAcceptRisk = (issueId: string) => {
    console.log('Accept risk for issue:', issueId)
    // TODO: Wire to backend
  }

  const handleGenerateSQL = (issueId: string) => {
    console.log('Generate SQL for issue:', issueId)
    // TODO: Wire to backend
  }

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Data Quality</h1>
        <p className="text-sm text-gray-600">Continuous data quality monitoring and validation</p>
      </div>

      {/* Cursor-style Tabs */}
      <CursorTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Summary Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Blocking Issues</div>
                <div className="text-2xl font-semibold text-red-600">{tabData.blocking}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Warnings</div>
                <div className="text-2xl font-semibold text-amber-600">{tabData.warnings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Ready</div>
                <div className="text-2xl font-semibold text-green-600">{tabData.ready}</div>
              </CardContent>
            </Card>
          </div>

          {/* Section Header */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{config.title}</h2>
            <p className="text-sm text-gray-600">{config.subtitle}</p>
          </div>

          {/* Issue Cards */}
          <div className="space-y-4">
            {tabData.issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onApplyFix={handleApplyFix}
                onAcceptRisk={handleAcceptRisk}
                onGenerateSQL={handleGenerateSQL}
              />
            ))}
          </div>

          {/* Continuous Reconciliation Card (Target Data only) */}
          {activeTab === 'target-data' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base">Continuous Reconciliation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  MINE continuously monitors your target system for data drift, schema changes, and validation issues.
                  All detected issues are surfaced here with AI-suggested fixes to maintain data quality over time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* View Outputs Button (Target Data only) */}
      {activeTab === 'target-data' && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
          <Button
            onClick={() => router.push(`/app/projects/${projectId}/outputs`)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white"
          >
            View Outputs
          </Button>
        </div>
      )}
    </div>
  )
}

interface IssueCardProps {
  issue: Issue
  onApplyFix: (issueId: string) => void
  onAcceptRisk: (issueId: string) => void
  onGenerateSQL: (issueId: string) => void
}

function IssueCard({ issue, onApplyFix, onAcceptRisk, onGenerateSQL }: IssueCardProps) {
  const getSeverityBadge = () => {
    switch (issue.severity) {
      case 'blocking':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Blocking
          </Badge>
        )
      case 'warning':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        )
      case 'ready':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        )
    }
  }

  if (issue.severity === 'ready') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{issue.field}</span>
                {getSeverityBadge()}
              </div>
              <p className="text-sm text-gray-700">{issue.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-900">{issue.field}</span>
              {getSeverityBadge()}
            </div>
            <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
            <p className="text-xs text-gray-500">Affected records: {issue.affectedRecords}</p>
          </div>
        </div>

        {issue.aiSuggestedFix && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">AI-Suggested Fix</h4>
            <p className="text-sm text-blue-700">{issue.aiSuggestedFix}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onApplyFix(issue.id)}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white"
              >
                Apply Fix
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAcceptRisk(issue.id)}
              >
                Accept Risk
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onGenerateSQL(issue.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                Generate SQL
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
