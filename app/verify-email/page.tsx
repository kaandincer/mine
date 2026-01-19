'use client'

import { Suspense, useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AuthCard from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified') === 'true'
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      setUser(currentUser)
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleResend = async () => {
    if (!user?.email) return

    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
    })

    if (error) {
      alert('Failed to resend email: ' + error.message)
    } else {
      alert('Verification email sent! Please check your inbox.')
    }
  }

  if (loading) {
    return (
      <AuthCard title="Verifying Email" subtitle="Please wait...">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
        </div>
      </AuthCard>
    )
  }

  if (verified) {
    return (
      <AuthCard title="Email Verified" subtitle="Your email has been successfully verified">
        <Alert variant="success">
          Your email has been verified! You can now access your account.
        </Alert>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/app/projects')}
        >
          Go to Dashboard
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Verify Your Email"
      subtitle="Please check your email to verify your account"
    >
      <Alert variant="default">
        We've sent a verification link to {user?.email || 'your email'}. Please click the link in
        the email to verify your account.
      </Alert>
      <div className="space-y-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Go to Sign In
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleResend}
          disabled={!user?.email}
        >
          Resend Verification Email
        </Button>
      </div>
    </AuthCard>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Verifying Email" subtitle="Please wait...">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          </div>
        </AuthCard>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
