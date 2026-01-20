import { getProject } from '@/lib/mock/projects'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const project = getProject(projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Project Details</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Project Name</div>
              <div className="text-sm text-gray-900">{project.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Source System</div>
              <div className="text-sm text-gray-900">{project.sourceSystem}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Target System</div>
              <div className="text-sm text-gray-900">{project.targetSystem}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
