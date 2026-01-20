'use client'

import { useParams } from 'next/navigation'
import { Outputs } from '@/components/app/Outputs'

export default function OutputsPage() {
  const params = useParams()
  const projectId = params.projectId as string

  return <Outputs projectId={projectId} />
}
