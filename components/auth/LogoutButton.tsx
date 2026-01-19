'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LogoutButton({ variant = 'outline', size = 'md', className }: LogoutButtonProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <Button variant={variant} size={size} onClick={handleSignOut} className={className}>
      Sign Out
    </Button>
  )
}
