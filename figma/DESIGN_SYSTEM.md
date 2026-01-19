# MINE - Design System & Implementation Guide

## Color Palette

### Primary Colors
```css
--primary-blue: #4F46E5;        /* Main brand color - buttons, accents */
--primary-blue-hover: #4338CA;  /* Hover state for primary buttons */
--primary-blue-light: #EEF2FF;  /* Light backgrounds */
```

### Neutral Colors
```css
--gray-50: #F9FAFB;    /* Page backgrounds */
--gray-100: #F3F4F6;   /* Light backgrounds, borders */
--gray-200: #E5E7EB;   /* Borders, dividers */
--gray-300: #D1D5DB;   /* Disabled states */
--gray-400: #9CA3AF;   /* Icons, placeholders */
--gray-500: #6B7280;   /* Secondary text */
--gray-600: #4B5563;   /* Body text */
--gray-700: #374151;   /* Emphasized text */
--gray-800: #1F2937;   /* Code, strong emphasis */
--gray-900: #111827;   /* Headings, primary text */
--white: #FFFFFF;      /* Cards, panels */
```

### Status Colors
```css
--green-100: #D1FAE5;  /* Success backgrounds */
--green-700: #047857;  /* Success text */
--yellow-100: #FEF3C7; /* Warning backgrounds */
--yellow-700: #B45309; /* Warning text */
--blue-50: #EFF6FF;    /* Info backgrounds */
--blue-100: #DBEAFE;   /* Badge backgrounds */
--blue-200: #BFDBFE;   /* Info borders */
--blue-600: #2563EB;   /* Info text */
--blue-700: #1D4ED8;   /* Badge text */
--blue-900: #1E3A8A;   /* Dark info text */
```

## Typography

### Font Family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes (Tailwind Classes)
- `text-xs`: 0.75rem (12px) - Labels, badges, captions
- `text-sm`: 0.875rem (14px) - Body text, buttons, table content
- `text-base`: 1rem (16px) - Default body text
- `text-lg`: 1.125rem (18px) - Section headings
- `text-xl`: 1.25rem (20px) - Card titles
- `text-2xl`: 1.5rem (24px) - Page titles

### Font Weights
- `font-normal`: 400 - Body text
- `font-medium`: 500 - Emphasis, labels
- `font-semibold`: 600 - Headings, section titles
- `font-bold`: 700 - Strong emphasis (rarely used)

## Spacing System

### Standard Spacing (Tailwind)
- `p-1`: 0.25rem (4px)
- `p-2`: 0.5rem (8px)
- `p-3`: 0.75rem (12px)
- `p-4`: 1rem (16px)
- `p-6`: 1.5rem (24px)
- `p-8`: 2rem (32px)

### Gap/Space Between Elements
- `gap-1`: 4px - Tight spacing (icons + text)
- `gap-2`: 8px - Default spacing
- `gap-3`: 12px - Medium spacing
- `gap-4`: 16px - Comfortable spacing
- `gap-6`: 24px - Section spacing
- `space-y-2`: 8px vertical between children
- `space-y-4`: 16px vertical between children
- `space-y-6`: 24px vertical between children

## Layout Structure

### Sidebar Dimensions
```css
/* Projects Dashboard Sidebar */
width: 4rem (64px);
background: white;
border-right: 1px solid #E5E7EB;

/* Project Workspace Navigation */
width: 16rem (256px);
background: white;
border-right: 1px solid #E5E7EB;
```

### Content Panels
```css
/* Left Panel (Schemas, Mapping, Transform) */
width: 20rem (320px);
background: white;
border-right: 1px solid #E5E7EB;

/* Right Panel */
flex: 1;
background: #F9FAFB;
```

## Component Specifications

### Buttons

#### Primary Button
```jsx
<Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
  Button Text
</Button>
```
```css
background-color: #4F46E5;
color: white;
padding: 0.5rem 1rem;
border-radius: 0.375rem (6px);
font-size: 0.875rem (14px);
font-weight: 500;
transition: background-color 150ms;

&:hover {
  background-color: #4338CA;
}
```

#### Secondary/Outline Button
```jsx
<Button variant="outline">
  Button Text
</Button>
```
```css
background-color: white;
color: #374151;
border: 1px solid #E5E7EB;
padding: 0.5rem 1rem;
border-radius: 0.375rem (6px);
font-size: 0.875rem (14px);
font-weight: 500;

&:hover {
  background-color: #F9FAFB;
}
```

#### Ghost Button
```jsx
<Button variant="ghost">
  Button Text
</Button>
```
```css
background-color: transparent;
color: #4B5563;
padding: 0.5rem 1rem;
border-radius: 0.375rem (6px);
font-size: 0.875rem (14px);

&:hover {
  background-color: #F3F4F6;
}
```

### Badges

#### Default Badge
```jsx
<Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
  AI-Generated
</Badge>
```
```css
background-color: #DBEAFE;
color: #1D4ED8;
padding: 0.125rem 0.5rem;
border-radius: 0.375rem (6px);
font-size: 0.75rem (12px);
font-weight: 500;
```

#### Status Badges
```jsx
/* Success */
<Badge className="bg-green-100 text-green-700 hover:bg-green-100">
  Mapped
</Badge>

/* Warning */
<Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
  Transform
</Badge>

/* Info */
<Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
  Tested
</Badge>
```

### Cards

#### Standard Card
```jsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  Card Content
</div>
```
```css
background-color: white;
border-radius: 0.5rem (8px);
border: 1px solid #E5E7EB;
padding: 1.5rem (24px);
```

#### Expandable Card/Section
```jsx
<div className="border border-gray-200 rounded-lg">
  <button className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors">
    <ChevronDown className="w-4 h-4 text-gray-500" />
    <span className="text-sm font-semibold text-gray-900">Section Title</span>
  </button>
  <div className="border-t border-gray-200 p-3">
    Content
  </div>
</div>
```

### Project Card (Dashboard)
```jsx
<div className="group bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all hover:border-[#4F46E5] hover:shadow-sm">
  <div className="flex items-start justify-between mb-3">
    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#4F46E5]">
      Project Name
    </h3>
    <Badge className="bg-green-100 text-green-700">In Progress</Badge>
  </div>
  <div className="space-y-2 mb-4">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Database className="w-4 h-4" />
      <span>Source → Target</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Calendar className="w-4 h-4" />
      <span>Last updated: Date</span>
    </div>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-500">Progress metric</span>
    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#4F46E5]" />
  </div>
</div>
```

### Input Fields

#### Text Input
```jsx
<input
  type="text"
  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
  placeholder="Placeholder text"
/>
```

#### Textarea
```jsx
<Textarea
  className="min-h-32 resize-none"
  placeholder="Placeholder text"
/>
```
```css
width: 100%;
min-height: 8rem (128px);
padding: 0.5rem 0.75rem;
font-size: 0.875rem (14px);
border: 1px solid #E5E7EB;
border-radius: 0.375rem (6px);
resize: none;

&:focus {
  outline: none;
  ring: 2px solid #4F46E5;
  border-color: transparent;
}
```

### Checkboxes
```jsx
<Checkbox 
  className="data-[state=checked]:bg-[#4F46E5]"
/>
```
```css
width: 1rem (16px);
height: 1rem (16px);
border: 1px solid #E5E7EB;
border-radius: 0.25rem (4px);

&:checked {
  background-color: #4F46E5;
  border-color: #4F46E5;
}
```

## Navigation & Tabs

### Sidebar Navigation Item
```jsx
<button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
  <Icon className="w-5 h-5" />
  <span>Menu Item</span>
</button>

/* Active State */
<button className="w-full flex items-center gap-3 px-4 py-3 text-sm bg-blue-50 text-[#4F46E5] border-r-2 border-[#4F46E5]">
  <Icon className="w-5 h-5" />
  <span className="font-medium">Active Item</span>
</button>
```

### Tab Navigation
```jsx
<div className="border-b border-gray-200 bg-white px-6">
  <div className="flex gap-6">
    <button className="px-1 py-4 text-sm font-medium text-gray-900 border-b-2 border-[#4F46E5]">
      Active Tab
    </button>
    <button className="px-1 py-4 text-sm text-gray-600 hover:text-gray-900 border-b-2 border-transparent">
      Inactive Tab
    </button>
  </div>
</div>
```

## Database Hierarchy Structure

### Database Level
```jsx
<div className="border border-gray-200 rounded-lg">
  <button className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors">
    {expanded ? (
      <ChevronDown className="w-4 h-4 text-gray-500" />
    ) : (
      <ChevronRight className="w-4 h-4 text-gray-500" />
    )}
    <span className="text-sm font-semibold text-[#4F46E5]">DATABASE_NAME</span>
  </button>
  {/* Tables container */}
</div>
```

### Table Level
```jsx
<div className="border border-gray-200 rounded-lg">
  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-2">
      {expanded ? (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-500" />
      )}
      <span className="text-sm font-medium text-gray-900">TableName</span>
    </div>
    <div className="flex items-center gap-2">
      <ArrowRight className="w-3 h-3 text-gray-400" />
      <span className="text-xs text-gray-600">TARGET_TABLE</span>
    </div>
  </button>
  {/* Fields container */}
</div>
```

### Field Level
```jsx
<button className="w-full p-3 border-b border-gray-200 last:border-0 hover:bg-gray-100 text-left">
  <div className="flex items-start justify-between gap-2 mb-1">
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
      <span className="text-xs text-gray-900 truncate">fieldName</span>
    </div>
    {/* Optional badge */}
  </div>
  <div className="flex items-center gap-1 ml-3.5">
    <ArrowRight className="w-3 h-3 text-gray-400" />
    <span className="text-xs text-gray-500 truncate">target_field</span>
  </div>
</button>

/* Selected State */
<button className="bg-blue-50 border-l-4 border-l-[#4F46E5]">
  {/* Same content as above */}
</button>
```

## Info Boxes

### Info Box (Blue)
```jsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex items-start gap-2">
    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
    <div>
      <div className="text-sm font-medium text-blue-900 mb-1">Title</div>
      <div className="text-xs text-blue-700">Description text</div>
    </div>
  </div>
</div>
```

### Warning Box (Yellow)
```jsx
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  <div className="flex items-start gap-2">
    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
    <div>
      <div className="text-sm font-medium text-yellow-900 mb-1">Title</div>
      <div className="text-xs text-yellow-700">Description text</div>
    </div>
  </div>
</div>
```

## Icons

All icons use Lucide React:
```jsx
import { 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  Database,
  Calendar,
  Plus,
  RefreshCw,
  Play,
  AlertCircle,
  HelpCircle,
  Settings
} from 'lucide-react';
```

### Icon Sizes
- `w-3 h-3`: 12px - Small indicators
- `w-4 h-4`: 16px - Standard icons in buttons, lists
- `w-5 h-5`: 20px - Navigation icons
- `w-8 h-8`: 32px - Large empty state icons
- `w-16 h-16`: 64px - Extra large empty state icons

## Transitions & Animations

### Standard Transitions
```css
transition-colors: color, background-color, border-color 150ms;
transition-all: all 150ms;
```

### Hover States
```css
/* Cards */
hover:border-[#4F46E5]
hover:shadow-sm

/* Buttons */
hover:bg-gray-50      /* Light backgrounds */
hover:bg-[#4338CA]    /* Primary buttons */

/* Text */
hover:text-gray-900
hover:text-[#4F46E5]
```

## Border Radius

- `rounded`: 0.25rem (4px) - Small elements
- `rounded-md`: 0.375rem (6px) - Inputs, badges
- `rounded-lg`: 0.5rem (8px) - Cards, panels
- `rounded-full`: 9999px - Circular elements

## Shadows

```css
/* Hover shadow on cards */
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Focus ring */
ring-2 ring-[#4F46E5]: 0 0 0 2px #4F46E5;
```

## Code/SQL Display

```jsx
<pre className="text-xs font-mono text-gray-800 bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
  {sqlCode}
</pre>
```

```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
font-size: 0.75rem (12px);
color: #1F2937;
background-color: #F9FAFB;
padding: 1rem;
border-radius: 0.25rem (4px);
border: 1px solid #E5E7EB;
overflow-x: auto;
```

## Tables

```jsx
<table className="w-full">
  <thead className="border-b border-gray-200">
    <tr>
      <th className="text-left text-xs font-medium text-gray-700 pb-3">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3 text-sm text-gray-600">Content</td>
    </tr>
  </tbody>
</table>
```

## Empty States

```jsx
<div className="flex-1 flex items-center justify-center p-6">
  <div className="text-center max-w-md">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Title</h3>
    <p className="text-sm text-gray-600">Description text</p>
  </div>
</div>
```

## Page Headers

```jsx
<div className="border-b border-gray-200 bg-white p-6">
  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Title</h1>
  <p className="text-sm text-gray-600">Description or breadcrumb</p>
</div>
```

## Footer Actions

```jsx
<div className="border-t border-gray-200 bg-white p-6 flex justify-between">
  <Button variant="outline">Secondary Action</Button>
  <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
    Primary Action
  </Button>
</div>
```

## Responsive Considerations

While the design is enterprise-focused and primarily desktop:

```css
/* Minimum widths */
min-width: 1280px; /* Recommended viewport */

/* Panel widths are fixed, not responsive */
/* This is intentional for the enterprise workflow */
```

## Z-Index Layers

```css
/* Base content */
z-index: 0

/* Dropdowns, popovers */
z-index: 10

/* Modals, overlays */
z-index: 50

/* Toasts, notifications */
z-index: 100
```
