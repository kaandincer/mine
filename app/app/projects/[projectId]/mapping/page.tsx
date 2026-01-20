'use client'

import { useParams } from 'next/navigation'
import { MappingReview } from '@/components/app/MappingReview'

export default function MappingPage() {
  const params = useParams()
  const projectId = params.projectId as string

  return <MappingReview projectId={projectId} />
}
