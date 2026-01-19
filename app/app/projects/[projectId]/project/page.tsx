import { Card, CardContent } from '@/components/ui/card'
import { getProject } from '@/lib/mock/projects'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const project = getProject(projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Project Name</div>
                <div className="mt-1 text-base text-gray-900">{project.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Source System</div>
                <div className="mt-1 text-base text-gray-900">{project.sourceSystem}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Target System</div>
                <div className="mt-1 text-base text-gray-900">{project.targetSystem}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
