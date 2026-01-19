'use client'

import { useState, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import MappingFilters from '@/components/mapping/MappingFilters'
import MappingGroup from '@/components/mapping/MappingGroup'
import { Button } from '@/components/ui/button'
import { mockMappings } from '@/lib/mock/projects'
import type { FilterType } from '@/components/mapping/MappingFilters'

export default function MappingPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string
  const [activeFilter, setActiveFilter] = useState<FilterType>('needs_review')

  const filteredGroups = useMemo(() => {
    return mockMappings.map((group) => {
      const filteredRows = group.rows.filter((row) => {
        switch (activeFilter) {
          case 'needs_review':
            return row.status === 'needs_review' || (row.confidence !== null && row.confidence < 85)
          case 'high_confidence':
            return row.confidence !== null && row.confidence >= 85
          case 'unmapped':
            return row.targetField === null
          case 'all':
          default:
            return true
        }
      })

      return { ...group, rows: filteredRows }
    }).filter(group => group.rows.length > 0)
  }, [activeFilter])

  const handleProceedToTransform = () => {
    router.push(`/app/projects/${projectId}/transform`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mapping Review</h1>
      </div>

      <MappingFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-600">SALESFORCE_PROD</span>
        <span className="text-sm font-semibold text-blue-600">SAP_S4HANA</span>
      </div>

      <div className="space-y-4">
        {filteredGroups.map((group, index) => (
          <MappingGroup key={index} group={group} />
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={handleProceedToTransform}>
          Proceed to Transform
        </Button>
      </div>
    </div>
  )
}
