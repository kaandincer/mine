'use client'

import { FileText, Database, GitBranch, Code, CheckCircle, Download, ArrowLeft } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  projectName?: string;
  projectId?: string;
}

export function Navigation({ projectName, projectId }: NavigationProps) {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'project', label: 'Control Plane', icon: FileText, href: projectId ? `/app/projects/${projectId}/project` : '#' },
    { id: 'schemas', label: 'Data Overview', icon: Database, href: projectId ? `/app/projects/${projectId}/schemas` : '#' },
    { id: 'data-quality', label: 'Data Quality', icon: CheckCircle, href: projectId ? `/app/projects/${projectId}/data-quality` : '#' },
    { id: 'mapping', label: 'Mapping', icon: GitBranch, href: projectId ? `/app/projects/${projectId}/mapping` : '#' },
    { id: 'transform', label: 'Transform', icon: Code, href: projectId ? `/app/projects/${projectId}/transform` : '#' },
    { id: 'outputs', label: 'Outputs', icon: Download, href: projectId ? `/app/projects/${projectId}/outputs` : '#' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/Mine Logo no background.png"
            alt="MINE - AI-Native Data Migration Automation"
            className="h-8 w-auto"
          />
          <span className="text-xl font-semibold text-gray-900">MINE</span>
        </div>
        <Link
          href="/app/projects"
          className="w-full flex items-center gap-2 text-sm text-gray-600 px-2 py-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Projects
        </Link>
        {projectName && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Current Project</div>
            <div className="text-sm font-medium text-gray-900">{projectName}</div>
          </div>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors
                    ${isActive 
                      ? 'bg-[#4F46E5] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
