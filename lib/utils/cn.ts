// Standalone class name utility - no external dependencies required
type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[]

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []
  
  for (const input of inputs) {
    if (!input) continue
    
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const inner = clsx(...input)
      if (inner) classes.push(inner)
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key)
        }
      }
    }
  }
  
  return classes.join(' ')
}

// Simple utility to merge class names
// Basic deduplication: keeps the last occurrence of conflicting classes
function mergeClasses(classes: string): string {
  if (!classes) return ''
  
  const classArray = classes.split(/\s+/).filter(Boolean)
  const seen = new Map<string, string>()
  
  // Process classes in reverse to keep the last occurrence
  for (let i = classArray.length - 1; i >= 0; i--) {
    const cls = classArray[i]
    // Extract base class name (before any variants like `hover:`, `focus:`, etc.)
    const baseClass = cls.split(':').pop()?.split('[')[0] || cls
    if (!seen.has(baseClass)) {
      seen.set(baseClass, cls)
    }
  }
  
  return Array.from(seen.values()).reverse().join(' ')
}

export function cn(...inputs: ClassValue[]): string {
  const combined = clsx(...inputs)
  return mergeClasses(combined)
}
