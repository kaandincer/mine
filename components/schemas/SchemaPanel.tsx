'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Upload } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Schema } from '@/lib/types'

interface SchemaPanelProps {
  schema: Schema
  title: string
  onSelectionChange: (tableId: string, selected: boolean) => void
  onSelectAll: () => void
  onDeselectAll: () => void
}

export default function SchemaPanel({
  schema,
  title,
  onSelectionChange,
  onSelectAll,
  onDeselectAll,
}: SchemaPanelProps) {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set(['account', 'customer']))
  const selectedCount = schema.tables.filter(t => t.selected).length

  const toggleTable = (tableId: string) => {
    const newExpanded = new Set(expandedTables)
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId)
    } else {
      newExpanded.add(tableId)
    }
    setExpandedTables(newExpanded)
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedCount} of {schema.tables.length} tables selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={onSelectAll}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Select All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={onDeselectAll}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Deselect All
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Schema Group */}
          <div>
            <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <ChevronDown className="h-4 w-4" />
              {schema.name}
            </div>

            {/* Tables */}
            <div className="ml-4 space-y-1">
              {schema.tables.map((table) => {
                const isExpanded = expandedTables.has(table.id)
                return (
                  <div key={table.id} className="rounded border border-gray-200">
                    <div className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        checked={table.selected}
                        onChange={(e) => onSelectionChange(table.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => toggleTable(table.id)}
                        className="flex flex-1 items-center gap-2 text-left"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="font-medium text-gray-900">{table.name}</span>
                        {isExpanded && (
                          <span className="text-sm text-gray-500">{table.fields.length} fields</span>
                        )}
                      </button>
                    </div>

                    {/* Fields Table */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Field</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Type</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Nullable</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Key</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.fields.map((field) => (
                              <tr key={field.id} className="border-b border-gray-100">
                                <td className="px-3 py-2 text-gray-900">{field.name}</td>
                                <td className="px-3 py-2 text-gray-600">{field.type}</td>
                                <td className="px-3 py-2 text-gray-600">
                                  {field.nullable ? '✔' : '—'}
                                </td>
                                <td className="px-3 py-2 text-gray-600">{field.key || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
