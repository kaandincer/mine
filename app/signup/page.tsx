'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AuthCard from '@/components/auth/AuthCard'
import FormField from '@/components/auth/FormField'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PERSONAL_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com']

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companySize: '',
    role: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [emailWarning, setEmailWarning] = useState(false)

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase()
    return PERSONAL_EMAIL_DOMAINS.includes(domain || '')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, email: value })
    if (value.includes('@')) {
      setEmailWarning(validateEmail(value))
    } else {
      setEmailWarning(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName,
            company_size: formData.companySize,
            role: formData.role,
          },
        },
      })

      if (signUpError) {
        // Security: Generic error messages to prevent account enumeration
        if (signUpError.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.')
        } else if (signUpError.message.includes('password')) {
          setError('Password does not meet requirements. Please use a stronger password.')
        } else {
          setError('Unable to create account. Please try again.')
        }
        setLoading(false)
        return
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        setSuccess(true)
        setLoading(false)
      } else {
        // No email confirmation required, redirect immediately
        router.push('/app/projects')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthCard title="Check your email" subtitle="We've sent you a confirmation link">
        <Alert variant="success">
          Please check your email ({formData.email}) to confirm your account before signing in.
        </Alert>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Go to Sign In
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Get started with MINE"
      subtitle="Create your account in minutes"
      footer={{
        text: 'Already have an account?',
        linkText: 'Sign in',
        linkHref: '/login',
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {emailWarning && (
          <Alert variant="default">
            Please use your work email address. Personal email domains are not recommended for business accounts.
          </Alert>
        )}

        <FormField
          label="Full name"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
          autoComplete="name"
        />

        <FormField
          label="Company name"
          name="companyName"
          placeholder="Acme Inc."
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          required
          autoComplete="organization"
        />

        <div className="space-y-2">
          <FormField
            label="Work email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
          />
        </div>

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          autoComplete="new-password"
        />

        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          autoComplete="new-password"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companySize">Company size (optional)</Label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role (optional)</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <option value="">Select role</option>
              <option value="data">Data</option>
              <option value="engineering">Engineering</option>
              <option value="it">IT</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Get started for free'}
        </Button>

        <p className="text-center text-xs text-gray-500">No credit card required</p>
      </form>
    </AuthCard>
  )
}
