'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SchemaPanel from '@/components/schemas/SchemaPanel'
import { Button } from '@/components/ui/button'
import { mockSourceSchema, mockTargetSchema } from '@/lib/mock/projects'

export default function SchemasPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string
  const [sourceSchema, setSourceSchema] = useState(mockSourceSchema)
  const [targetSchema, setTargetSchema] = useState(mockTargetSchema)

  const handleSourceSelectionChange = (tableId: string, selected: boolean) => {
    setSourceSchema({
      ...sourceSchema,
      tables: sourceSchema.tables.map(t => t.id === tableId ? { ...t, selected } : t),
    })
  }

  const handleTargetSelectionChange = (tableId: string, selected: boolean) => {
    setTargetSchema({
      ...targetSchema,
      tables: targetSchema.tables.map(t => t.id === tableId ? { ...t, selected } : t),
    })
  }

  const handleSourceSelectAll = () => {
    setSourceSchema({
      ...sourceSchema,
      tables: sourceSchema.tables.map(t => ({ ...t, selected: true })),
    })
  }

  const handleSourceDeselectAll = () => {
    setSourceSchema({
      ...sourceSchema,
      tables: sourceSchema.tables.map(t => ({ ...t, selected: false })),
    })
  }

  const handleTargetSelectAll = () => {
    setTargetSchema({
      ...targetSchema,
      tables: targetSchema.tables.map(t => ({ ...t, selected: true })),
    })
  }

  const handleTargetDeselectAll = () => {
    setTargetSchema({
      ...targetSchema,
      tables: targetSchema.tables.map(t => ({ ...t, selected: false })),
    })
  }

  const handleGenerateMappings = () => {
    router.push(`/app/projects/${projectId}/mapping`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schema Ingestion</h1>
        <p className="mt-1 text-base text-gray-600">Select tables to include in the migration.</p>
      </div>

      <div className="flex gap-6">
        <SchemaPanel
          schema={sourceSchema}
          title="Source Schema"
          onSelectionChange={handleSourceSelectionChange}
          onSelectAll={handleSourceSelectAll}
          onDeselectAll={handleSourceDeselectAll}
        />
        <SchemaPanel
          schema={targetSchema}
          title="Target Schema"
          onSelectionChange={handleTargetSelectionChange}
          onSelectAll={handleTargetSelectAll}
          onDeselectAll={handleTargetDeselectAll}
        />
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={handleGenerateMappings}>
          Generate Mappings
        </Button>
      </div>
    </div>
  )
}
