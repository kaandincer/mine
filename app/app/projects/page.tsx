import ProjectsListShell from '@/components/shell/ProjectsListShell'
import ProjectCardRow from '@/components/projects/ProjectCardRow'
import { Button } from '@/components/ui/button'
import { Plus } from '@/components/icons'
import { mockProjects } from '@/lib/mock/projects'

export default function ProjectsPage() {
  return (
    <ProjectsListShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 text-base text-gray-600">Manage your data migration projects</p>
          </div>
          <Button variant="primary" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Project
          </Button>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <ProjectCardRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </ProjectsListShell>
  )
}
