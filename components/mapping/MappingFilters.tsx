'use client'

import { cn } from '@/lib/utils/cn'

export type FilterType = 'needs_review' | 'high_confidence' | 'unmapped' | 'all'

interface MappingFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function MappingFilters({ activeFilter, onFilterChange }: MappingFiltersProps) {
  const filters = [
    { id: 'needs_review' as FilterType, label: 'Needs Review' },
    { id: 'high_confidence' as FilterType, label: 'High Confidence' },
    { id: 'unmapped' as FilterType, label: 'Unmapped' },
    { id: 'all' as FilterType, label: 'All' },
  ]

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
