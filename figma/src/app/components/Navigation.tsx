import { FileText, Database, GitBranch, Code, CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  projectName?: string;
  onBackToProjects?: () => void;
}

export function Navigation({ currentScreen, onNavigate, projectName, onBackToProjects }: NavigationProps) {
  const navItems = [
    { id: 'project', label: 'Project', icon: FileText },
    { id: 'schemas', label: 'Schemas', icon: Database },
    { id: 'mapping', label: 'Mapping', icon: GitBranch },
    { id: 'transform', label: 'Transform', icon: Code },
    { id: 'validate', label: 'Validate', icon: CheckCircle },
    { id: 'outputs', label: 'Outputs', icon: Download },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#4F46E5] rounded flex items-center justify-center">
            <span className="text-white font-semibold">M</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">MINE</span>
        </div>
        {onBackToProjects && (
          <Button
            variant="ghost"
            onClick={onBackToProjects}
            className="w-full justify-start gap-2 text-sm text-gray-600 px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Button>
        )}
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
            const isActive = currentScreen === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
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
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}