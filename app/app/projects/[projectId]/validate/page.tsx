'use client'

import { useParams } from 'next/navigation'
import { Validate } from '@/components/app/Validate'

export default function ValidatePage() {
  const params = useParams()
  const projectId = params.projectId as string

  return <Validate projectId={projectId} />
}
