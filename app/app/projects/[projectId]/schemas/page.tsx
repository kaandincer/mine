'use client'

import { useParams } from 'next/navigation'
import { SchemaIngestion } from '@/components/app/SchemaIngestion'

export default function SchemasPage() {
  const params = useParams()
  const projectId = params.projectId as string

  return <SchemaIngestion projectId={projectId} />
}
