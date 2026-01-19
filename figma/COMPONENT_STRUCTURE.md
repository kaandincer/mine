# MINE - Component Structure & Code Patterns

## File Structure

```
/src
  /app
    /components
      /ui
        - button.tsx
        - badge.tsx
        - checkbox.tsx
        - textarea.tsx
      - Navigation.tsx
      - ProjectsDashboard.tsx
      - ProjectSetup.tsx
      - SchemaIngestion.tsx
      - MappingReview.tsx
      - Transform.tsx
      - Validate.tsx
      - Outputs.tsx
    - App.tsx
  /styles
    - fonts.css
    - theme.css
```

## Main App Component

**File: `/src/app/App.tsx`**

```typescript
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

  // Projects Dashboard View
  if (!selectedProjectId) {
    return (
      <div className="size-full flex bg-gray-50">
        {/* Minimal Sidebar - 64px wide */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-[#4F46E5] rounded flex items-center justify-center">
              <span className="text-white font-semibold text-lg">M</span>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Bottom Icons */}
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
        
        {/* Main Content */}
        <ProjectsDashboard onSelectProject={setSelectedProjectId} />
      </div>
    );
  }

  // Project Workspace View
  return (
    <div className="size-full flex bg-gray-50">
      {/* Left Navigation - 256px wide */}
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        projectName="Salesforce to SAP Migration"
        onBackToProjects={handleBackToProjects}
      />
      
      {/* Screen Content */}
      {currentScreen === 'schemas' && <SchemaIngestion onNext={navigateNext} />}
      {currentScreen === 'mapping' && <MappingReview onNext={navigateNext} />}
      {currentScreen === 'transform' && <Transform onNext={navigateNext} />}
      {currentScreen === 'validate' && <Validate onNext={navigateNext} />}
      {currentScreen === 'outputs' && <Outputs onReset={handleBackToProjects} />}
    </div>
  );
}
```

## Projects Dashboard Component

**File: `/src/app/components/ProjectsDashboard.tsx`**

Key Structure:
```typescript
interface ProjectsDashboardProps {
  onSelectProject: (projectId: string) => void;
}

export function ProjectsDashboard({ onSelectProject }: ProjectsDashboardProps) {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Projects</h1>
            <p className="text-sm text-gray-600">Manage your data migration projects</p>
          </div>
          <Button onClick={() => setShowSetup(true)} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Project Cards */}
        </div>
      </div>

      {/* Project Setup Modal */}
      {showSetup && <ProjectSetup onClose={() => setShowSetup(false)} onCreate={onSelectProject} />}
    </div>
  );
}
```

## Navigation Component

**File: `/src/app/components/Navigation.tsx`**

```typescript
interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  projectName: string;
  onBackToProjects: () => void;
}

export function Navigation({ currentScreen, onNavigate, projectName, onBackToProjects }: NavigationProps) {
  const menuItems = [
    { id: 'project', label: 'Project', icon: FolderOpen },
    { id: 'schemas', label: 'Schemas', icon: Database },
    { id: 'mapping', label: 'Mapping', icon: ArrowLeftRight },
    { id: 'transform', label: 'Transform', icon: Code2 },
    { id: 'validate', label: 'Validate', icon: CheckCircle2 },
    { id: 'outputs', label: 'Outputs', icon: Download },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header with Back Button */}
      <div className="p-4 border-b border-gray-200">
        <button onClick={onBackToProjects} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>All Projects</span>
        </button>
        <h2 className="text-sm font-semibold text-gray-900">{projectName}</h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-[#4F46E5] border-r-2 border-[#4F46E5] font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
```

## Transform Component (Three-Panel Layout)

**File: `/src/app/components/Transform.tsx`**

Structure Pattern:
```typescript
interface TransformProps {
  onNext: () => void;
}

export function Transform({ onNext }: TransformProps) {
  const [transforms, setTransforms] = useState<TableTransforms[]>(mockData);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [selectedField, setSelectedField] = useState<{tableIndex: number, fieldIndex: number} | null>(null);

  return (
    <div className="flex-1 bg-gray-50 flex">
      {/* LEFT PANEL - Field Selection (320px) */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Select Fields to Transform</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {/* Database > Table > Field hierarchy */}
        </div>
      </div>

      {/* RIGHT PANEL - Transform Editor (flex-1) */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Transform Field</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Prompt input, SQL display, test results */}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white p-6 flex justify-between">
          <Button variant="outline">Save Transformation</Button>
          <Button onClick={onNext} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
            Continue to Validation
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Mapping Review Component (Three-Column Layout)

**File: `/src/app/components/MappingReview.tsx`**

Structure:
```typescript
export function MappingReview({ onNext }: MappingReviewProps) {
  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review Mappings</h1>
      </div>

      {/* Three-column layout */}
      <div className="flex-1 overflow-hidden flex">
        {/* Source Column */}
        <div className="flex-1 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 uppercase">Source</h3>
            <div className="text-sm font-medium text-gray-900">SALESFORCE_PROD</div>
          </div>
          <div className="overflow-auto p-4">
            {/* Source fields */}
          </div>
        </div>

        {/* Mapping Column */}
        <div className="w-20 border-r border-gray-200 bg-gray-50">
          {/* Mapping indicators */}
        </div>

        {/* Target Column */}
        <div className="flex-1 bg-white">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 uppercase">Target</h3>
            <div className="text-sm font-medium text-gray-900">SAP_S4HANA</div>
          </div>
          <div className="overflow-auto p-4">
            {/* Target fields */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white p-6 flex justify-between">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={onNext} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
          Approve & Continue
        </Button>
      </div>
    </div>
  );
}
```

## Schema Ingestion Component

**File: `/src/app/components/SchemaIngestion.tsx`**

Two-panel layout pattern:
```typescript
export function SchemaIngestion({ onNext }: SchemaIngestionProps) {
  return (
    <div className="flex-1 flex">
      {/* Left Panel - Schema Browser */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Panel header */}
        {/* Scrollable content */}
      </div>

      {/* Right Panel - Preview/Details */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* Content */}
        {/* Footer actions */}
      </div>
    </div>
  );
}
```

## Common Patterns

### Expandable Hierarchy
```typescript
// State management
const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

// Toggle function
const toggleTable = (tableName: string) => {
  const newExpanded = new Set(expandedTables);
  if (newExpanded.has(tableName)) {
    newExpanded.delete(tableName);
  } else {
    newExpanded.add(tableName);
  }
  setExpandedTables(newExpanded);
};

// Render
<button onClick={() => toggleTable(table.name)}>
  {expandedTables.has(table.name) ? (
    <ChevronDown className="w-4 h-4 text-gray-500" />
  ) : (
    <ChevronRight className="w-4 h-4 text-gray-500" />
  )}
</button>
```

### Selection State
```typescript
const [selectedField, setSelectedField] = useState<{
  tableIndex: number;
  fieldIndex: number;
} | null>(null);

const isSelected = selectedField?.tableIndex === tableIndex && 
                   selectedField?.fieldIndex === fieldIndex;

<button
  className={isSelected 
    ? 'bg-blue-50 border-l-4 border-l-[#4F46E5]' 
    : 'hover:bg-gray-100 border-l-4 border-l-transparent'
  }
>
```

### Confidence Indicators
```typescript
interface ConfidenceProps {
  score: number; // 0-1
}

function ConfidenceIndicator({ score }: ConfidenceProps) {
  const getColor = () => {
    if (score >= 0.8) return 'text-green-700 bg-green-100';
    if (score >= 0.6) return 'text-yellow-700 bg-yellow-100';
    return 'text-gray-700 bg-gray-100';
  };

  return (
    <div className={`px-2 py-1 rounded text-xs font-medium ${getColor()}`}>
      {Math.round(score * 100)}%
    </div>
  );
}
```

## Data Type Definitions

```typescript
// Schemas
interface Database {
  name: string;
  tables: Table[];
}

interface Table {
  name: string;
  fields: Field[];
  rowCount?: number;
  selected?: boolean;
}

interface Field {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey?: boolean;
}

// Mappings
interface TableMapping {
  sourceTable: string;
  targetTable: string;
  confidence: number;
  approved: boolean;
  fields: FieldMapping[];
}

interface FieldMapping {
  sourceField: string;
  targetField: string;
  confidence: number;
  approved: boolean;
  requiresTransform?: boolean;
}

// Transforms
interface TableTransforms {
  sourceTable: string;
  targetTable: string;
  fields: FieldTransform[];
}

interface FieldTransform {
  sourceField: string;
  targetField: string;
  hasTransform: boolean;
  prompt?: string;
  sql?: string;
  tested?: boolean;
}

// Projects
interface Project {
  id: string;
  name: string;
  sourceSystem: string;
  targetSystem: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  lastUpdated: string;
  tablesCount?: number;
  mappedCount?: number;
}
```

## UI Component Imports

All components should import from the shared UI library:

```typescript
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Textarea } from '@/app/components/ui/textarea';
```

## Icon Imports

```typescript
import {
  // Navigation
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  
  // Actions
  Plus,
  RefreshCw,
  Play,
  Download,
  Upload,
  
  // Status
  CheckCircle2,
  AlertCircle,
  XCircle,
  
  // Features
  Database,
  Code2,
  FolderOpen,
  ArrowLeftRight,
  
  // UI
  HelpCircle,
  Settings,
  Calendar,
} from 'lucide-react';
```

## Key Layout Principles

1. **Two-panel layouts** for browse + detail (Schemas, Outputs)
2. **Three-panel layouts** for source-mapping-target workflows (Mapping, Transform)
3. **Fixed left panel width** (320px for content, 256px for navigation, 64px for minimal sidebar)
4. **Flexible right panel** (flex-1)
5. **Sticky headers and footers** with border separators
6. **Overflow handling** on scrollable sections only
7. **Consistent padding**: p-4 for panels, p-6 for main content, p-3 for compact areas
8. **Hierarchical indentation** using ml-3.5 or nested padding

## Workflow State Management

```typescript
// In App.tsx
type Screen = 'project' | 'schemas' | 'mapping' | 'transform' | 'validate' | 'outputs';
const [currentScreen, setCurrentScreen] = useState<Screen>('schemas');

// Navigation helper
const navigateNext = () => {
  const screens: Screen[] = ['schemas', 'mapping', 'transform', 'validate', 'outputs'];
  const currentIndex = screens.indexOf(currentScreen);
  if (currentIndex < screens.length - 1) {
    setCurrentScreen(screens[currentIndex + 1]);
  }
};

// Pass to child components
<Transform onNext={navigateNext} />
```
