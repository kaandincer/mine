import * as React from 'react'
import { AlertCircle, CheckCircle2, X } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success'
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border p-4',
          {
            'border-gray-200 bg-gray-50 text-gray-900': variant === 'default',
            'border-red-200 bg-red-50 text-red-900': variant === 'destructive',
            'border-green-200 bg-green-50 text-green-900': variant === 'success',
          },
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {variant === 'destructive' && <AlertCircle className="h-5 w-5 shrink-0" />}
          {variant === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0" />}
          <div className="flex-1 text-sm">{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded p-1 hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert }
