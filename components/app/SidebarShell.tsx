'use client'

import Link from 'next/link'
import { HelpCircle, Settings } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface SidebarShellProps {
  children: React.ReactNode
}

export default function SidebarShell({ children }: SidebarShellProps) {
  return (
    <div className="size-full flex bg-gray-50">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <Link href="/app/projects" className="w-10 h-10 bg-[#4F46E5] rounded flex items-center justify-center">
            <span className="text-white font-semibold text-lg">M</span>
          </Link>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="p-3 border-t border-gray-200 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-10 p-0 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Link href="/app/profile">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 p-0 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
