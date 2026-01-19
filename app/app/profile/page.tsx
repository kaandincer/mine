import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/lib/actions/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-base text-gray-600">Manage your account settings</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="lg">
            Sign Out
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Email</div>
            <div className="mt-1 text-base text-gray-900">{user.email}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Full Name</div>
            <div className="mt-1 text-base text-gray-900">
              {profile?.full_name || 'Not set'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Account Created</div>
            <div className="mt-1 text-base text-gray-900">
              {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Email Verified</div>
            <div className="mt-1 text-base text-gray-900">
              {user.email_confirmed_at ? (
                <span className="text-green-600">Verified</span>
              ) : (
                <span className="text-yellow-600">Not verified</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
