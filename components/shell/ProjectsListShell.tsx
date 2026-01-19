'use client'

import Link from 'next/link'
import { HelpCircle, Settings } from '@/components/icons'
import LogoutButton from '@/components/auth/LogoutButton'

interface ProjectsListShellProps {
  children: React.ReactNode
}

export default function ProjectsListShell({ children }: ProjectsListShellProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Gutter */}
      <div className="flex w-16 flex-col items-center border-r border-gray-200 bg-white">
        {/* Logo */}
        <Link href="/app/projects" className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
          <span className="text-xl font-bold text-white">M</span>
        </Link>

        {/* Bottom utility icons */}
        <div className="mt-auto mb-4 flex flex-col gap-2">
          <Link
            href="/app/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            title="Profile"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-8 py-8">{children}</div>
      </div>
    </div>
  )
}
