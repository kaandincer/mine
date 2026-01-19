'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockSourceSchema } from '@/lib/mock/projects'

interface FieldSelectorProps {
  selectedFieldId?: string
  onFieldSelect: (fieldId: string) => void
}

const fieldsRequiringTransform = ['3', '4'] // Type and Industry fields

export default function FieldSelector({ selectedFieldId, onFieldSelect }: FieldSelectorProps) {
  const [expandedObjects, setExpandedObjects] = useState<Set<string>>(new Set(['account']))

  const toggleObject = (objectId: string) => {
    const newExpanded = new Set(expandedObjects)
    if (newExpanded.has(objectId)) {
      newExpanded.delete(objectId)
    } else {
      newExpanded.add(objectId)
    }
    setExpandedObjects(newExpanded)
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Select Fields to Transform</CardTitle>
        <p className="text-sm text-gray-600">5 fields require transformation</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Schema Group */}
          <div>
            <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <ChevronDown className="h-4 w-4" />
              ✓ SALESFORCE_PROD
            </div>

            {/* Objects */}
            <div className="ml-4 space-y-1">
              {mockSourceSchema.tables.map((table) => {
                const isExpanded = expandedObjects.has(table.id)
                const targetName = table.id === 'account' ? 'CUSTOMER' : 'CONTACT_PERSON'

                return (
                  <div key={table.id}>
                    <button
                      onClick={() => toggleObject(table.id)}
                      className="mb-1 flex w-full items-center gap-2 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        ✓ {table.name} → {targetName}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="ml-6 space-y-1">
                        {table.fields.map((field) => {
                          const requiresTransform = fieldsRequiringTransform.includes(field.id)
                          const isSelected = selectedFieldId === field.id
                          const targetFieldName =
                            field.id === 'type'
                              ? 'CUSTOMER_TYPE'
                              : field.id === 'industry'
                              ? 'INDUSTRY_CODE'
                              : field.name.toUpperCase()

                          return (
                            <button
                              key={field.id}
                              onClick={() => onFieldSelect(field.id)}
                              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors ${
                                isSelected
                                  ? 'bg-blue-50 border-l-4 border-blue-600'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <span className="text-gray-900">
                                {field.name} → {targetFieldName}
                              </span>
                              {requiresTransform && (
                                <Badge variant="transform" className="ml-auto">
                                  Transform
                                </Badge>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
