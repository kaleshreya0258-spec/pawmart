import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'pawmart_admin_session'

export function getAdminSession() {
  const cookieStore = cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  return session?.value === 'authenticated' ? true : false
}
