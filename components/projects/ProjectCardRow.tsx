'use client'

import Link from 'next/link'
import { ChevronRight, Database, Calendar } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Project } from '@/lib/types'

interface ProjectCardRowProps {
  project: Project
}

export default function ProjectCardRow({ project }: ProjectCardRowProps) {
  const statusLabel = project.status === 'in_progress' ? 'In Progress' : 'Completed'
  const statusVariant = project.status === 'in_progress' ? 'inProgress' : 'completed'

  return (
    <Link href={`/app/projects/${project.id}/project`}>
      <Card className="group cursor-pointer p-6 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              {project.sourceSystem} → {project.targetSystem}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>{project.tablesCount} tables</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last modified {project.lastModified}</span>
              </div>
              <span>Current: {project.currentStage}</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
        </div>
      </Card>
    </Link>
  )
}
