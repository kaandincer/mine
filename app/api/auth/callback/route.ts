import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/app/projects'
  const type = requestUrl.searchParams.get('type') // 'recovery' or 'signup'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Handle email verification
      if (type === 'signup') {
        return NextResponse.redirect(new URL('/verify-email?verified=true', requestUrl.origin))
      }
      
      // Handle password reset
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
      }
      
      // Default redirect
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }
  }

  // Error or no code, redirect to login
  return NextResponse.redirect(new URL('/login?error=auth_callback_error', requestUrl.origin))
}
