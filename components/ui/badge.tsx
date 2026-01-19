import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'inProgress' | 'completed' | 'approved' | 'blocking' | 'warning' | 'transform' | 'aiGenerated' | 'tested' | 'confidence'
  confidence?: number
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', confidence, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'inProgress':
          return 'bg-blue-100 text-blue-700'
        case 'completed':
          return 'bg-green-100 text-green-700'
        case 'approved':
          return 'bg-green-100 text-green-700'
        case 'blocking':
          return 'bg-red-100 text-red-700'
        case 'warning':
          return 'bg-yellow-100 text-yellow-700'
        case 'transform':
          return 'bg-yellow-100 text-yellow-700'
        case 'aiGenerated':
          return 'bg-blue-100 text-blue-700'
        case 'tested':
          return 'bg-green-100 text-green-700'
        case 'confidence':
          if (confidence && confidence >= 90) return 'bg-green-100 text-green-700'
          if (confidence && confidence >= 75) return 'bg-yellow-100 text-yellow-700'
          return 'bg-yellow-100 text-yellow-700'
        default:
          return 'bg-gray-100 text-gray-700'
      }
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          getVariantStyles(),
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
