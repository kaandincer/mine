import ProjectWorkspaceShell from '@/components/shell/ProjectWorkspaceShell'

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <ProjectWorkspaceShell projectId={projectId}>{children}</ProjectWorkspaceShell>
}
