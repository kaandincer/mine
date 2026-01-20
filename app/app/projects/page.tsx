'use client'

import SidebarShell from '@/components/app/SidebarShell'
import { ProjectsDashboard } from '@/components/app/ProjectsDashboard'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const router = useRouter()

  const handleSelectProject = (projectId: string) => {
    router.push(`/app/projects/${projectId}/schemas`)
  }

  return (
    <SidebarShell>
      <ProjectsDashboard onSelectProject={handleSelectProject} />
    </SidebarShell>
  )
}
