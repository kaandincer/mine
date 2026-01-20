import * as React from 'react'

/**
 * A simple Slot component that merges props with its child.
 * This is a fallback implementation for @radix-ui/react-slot
 */
const Slot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    asChild?: boolean
    children?: React.ReactNode
  }
>((props, forwardedRef) => {
  const { asChild, children, ...slotProps } = props

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...slotProps,
      ...children.props,
      ref: forwardedRef,
      className: [slotProps.className, children.props.className].filter(Boolean).join(' '),
    } as any)
  }

  return <span {...slotProps} ref={forwardedRef}>{children}</span>
})

Slot.displayName = 'Slot'

export { Slot }
