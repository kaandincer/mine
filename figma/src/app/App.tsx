import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { ProjectsDashboard } from '@/app/components/ProjectsDashboard';
import { SchemaIngestion } from '@/app/components/SchemaIngestion';
import { MappingReview } from '@/app/components/MappingReview';
import { Transform } from '@/app/components/Transform';
import { Validate } from '@/app/components/Validate';
import { Outputs } from '@/app/components/Outputs';
import { HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

type Screen = 'project' | 'schemas' | 'mapping' | 'transform' | 'validate' | 'outputs';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('schemas');

  const navigateNext = () => {
    const screens: Screen[] = ['schemas', 'mapping', 'transform', 'validate', 'outputs'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setCurrentScreen('schemas');
  };

  // Show projects dashboard if no project is selected
  if (!selectedProjectId) {
    return (
      <div className="size-full flex bg-gray-50">
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-[#4F46E5] rounded flex items-center justify-center">
              <span className="text-white font-semibold text-lg">M</span>
            </div>
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
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 p-0 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <ProjectsDashboard onSelectProject={setSelectedProjectId} />
      </div>
    );
  }

  // Show project workspace with navigation
  return (
    <div className="size-full flex bg-gray-50">
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        projectName="Salesforce to SAP Migration"
        onBackToProjects={handleBackToProjects}
      />
      
      {currentScreen === 'project' && (
        <div className="flex-1 bg-gray-50 p-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Project Details</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Project Name</div>
                  <div className="text-sm text-gray-900">Salesforce to SAP Migration</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Source System</div>
                  <div className="text-sm text-gray-900">Salesforce</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Target System</div>
                  <div className="text-sm text-gray-900">SAP S/4HANA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === 'schemas' && <SchemaIngestion onNext={navigateNext} />}
      {currentScreen === 'mapping' && <MappingReview onNext={navigateNext} />}
      {currentScreen === 'transform' && <Transform onNext={navigateNext} />}
      {currentScreen === 'validate' && <Validate onNext={navigateNext} />}
      {currentScreen === 'outputs' && <Outputs onReset={handleBackToProjects} />}
    </div>
  );
}