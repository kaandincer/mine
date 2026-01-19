import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import '../globals.css'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=' + encodeURIComponent('/app/projects'))
  }

  return <>{children}</>
}
