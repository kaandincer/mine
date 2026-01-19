'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Database, GitBranch, Code, CheckCircle2, Download, Settings } from '@/components/icons'
import { cn } from '@/lib/utils/cn'
import { Separator } from '@/components/ui/separator'
import { getProject } from '@/lib/mock/projects'

interface ProjectWorkspaceShellProps {
  children: React.ReactNode
  projectId: string
}

const navItems = [
  { href: 'project', label: 'Project', icon: FileText },
  { href: 'schemas', label: 'Schemas', icon: Database },
  { href: 'mapping', label: 'Mapping', icon: GitBranch },
  { href: 'transform', label: 'Transform', icon: Code },
  { href: 'validate', label: 'Validate', icon: CheckCircle2 },
  { href: 'outputs', label: 'Outputs', icon: Download },
]

export default function ProjectWorkspaceShell({ children, projectId }: ProjectWorkspaceShellProps) {
  const pathname = usePathname()
  const project = getProject(projectId)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="p-4">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <span className="text-lg font-bold text-gray-900">MINE</span>
          </div>

          {/* Back to Projects */}
          <Link href="/app/projects" className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900">
            ← All Projects
          </Link>

          <Separator className="my-4" />

          {/* Current Project */}
          <div className="mb-4">
            <div className="mb-1 text-xs font-medium text-gray-500">Current Project</div>
            <div className="text-sm font-semibold text-gray-900">{project?.name || 'Unknown Project'}</div>
          </div>

          <Separator className="my-4" />

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const href = `/app/projects/${projectId}/${item.href}`
              const isActive = pathname === href || pathname?.startsWith(href + '/')

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          
          <Separator className="my-4" />
          
          <Link
            href="/app/profile"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/app/profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <Settings className="h-5 w-5" />
            Profile
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </div>
    </div>
  )
}
