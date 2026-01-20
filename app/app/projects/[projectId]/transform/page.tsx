'use client'

import { useParams } from 'next/navigation'
import { Transform } from '@/components/app/Transform'

export default function TransformPage() {
  const params = useParams()
  const projectId = params.projectId as string

  return <Transform projectId={projectId} />
}
