'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Check, Pencil, X } from '@/components/icons'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MappingGroup as MappingGroupType } from '@/lib/types'

interface MappingGroupProps {
  group: MappingGroupType
}

export default function MappingGroup({ group }: MappingGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <span className="font-semibold text-gray-900">{group.sourceObject}</span>
            <span className="text-sm text-gray-500">{group.rows.length} fields</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{group.targetObject}</span>
            <Badge variant="confidence" confidence={group.overallConfidence}>
              {group.overallConfidence}%
            </Badge>
            <Badge variant="approved">Approved</Badge>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-3">
            {group.rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{row.sourceField}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">→</span>
                  {row.confidence !== null && (
                    <Badge variant="confidence" confidence={row.confidence}>
                      {row.confidence}%
                    </Badge>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {row.targetField || 'Unmapped'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded p-1 text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 text-gray-600 hover:bg-gray-100">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1 text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
