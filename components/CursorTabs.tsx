'use client'

import * as React from 'react'
import { cn } from '@/components/ui/utils'

interface Tab {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface CursorTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function CursorTabs({ tabs, activeTab, onTabChange, className }: CursorTabsProps) {
  return (
    <div className={cn('flex border-b border-gray-200 bg-white', className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              'flex items-center gap-2 border border-b-0 border-gray-200 rounded-t-md',
              'relative -mb-px',
              isActive
                ? 'text-gray-900 bg-gray-50 border-gray-200 border-b-gray-50'
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
