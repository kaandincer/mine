import { createClient } from '@/lib/supabase/server'

export async function checkAuth() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return { user: null, error }
    }

    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}
