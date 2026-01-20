'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, HelpCircle, Profile } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface SidebarShellProps {
  children: React.ReactNode
}

export default function SidebarShell({ children }: SidebarShellProps) {
  const pathname = usePathname()
  
  // Determine active states
  // Home is active on /app/projects (the main projects list page)
  const isHomeActive = pathname === '/app/projects' || pathname === '/app'
  const isSupportActive = pathname === '/app/support'
  const isProfileActive = pathname === '/app/profile'

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col h-screen">
        <div className="p-3 border-b border-gray-200 flex-shrink-0">
          <Link href="/app/projects" className="w-10 h-10 bg-[#4F46E5] rounded flex items-center justify-center">
            <span className="text-white font-semibold text-lg">M</span>
          </Link>
        </div>
        
        {/* Spacer to push icons to bottom */}
        <div className="flex-1 min-h-0"></div>
        
        {/* Bottom icons - home, help (support), and profile - positioned at very bottom */}
        <div className="border-t border-gray-200 flex-shrink-0 pt-3 px-3 pb-3">
          <div className="space-y-2">
            <Link href="/app/projects" title="Home">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full h-10 p-0 flex items-center justify-center transition-colors ${
                  isHomeActive
                    ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/app/support" title="Support">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full h-10 p-0 flex items-center justify-center transition-colors ${
                  isSupportActive
                    ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/app/profile" title="Profile">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full h-10 p-0 flex items-center justify-center transition-colors ${
                  isProfileActive
                    ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Profile className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
