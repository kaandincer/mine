import { Navigation } from '@/components/app/Navigation'
import { getProject } from '@/lib/mock/projects'

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = getProject(projectId)
  
  return (
    <div className="size-full flex bg-gray-50">
      <Navigation projectName={project?.name} projectId={projectId} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
