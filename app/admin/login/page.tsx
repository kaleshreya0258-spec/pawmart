'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const ADMIN_EMAIL = 'admin@pawmart.com'
const ADMIN_PASSWORD = 'pawmart123'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState(ADMIN_PASSWORD)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      document.cookie = 'pawmart_admin_session=authenticated; path=/; max-age=86400'
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect email or password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🐾</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">PawMart Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your store</p>
        </div>

        {/* Quick-fill hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700">
          <p className="font-semibold mb-1">🔑 Demo credentials (pre-filled)</p>
          <p>Email: <code className="font-mono bg-blue-100 px-1 rounded">admin@pawmart.com</code></p>
          <p>Password: <code className="font-mono bg-blue-100 px-1 rounded">pawmart123</code></p>
        </div>

        <form onSubmit={handleLogin} className="card p-8 space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
            <input
              id="admin-email"
              title="Admin email"
              placeholder="admin@pawmart.com"
              type="email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                title="Admin password"
                placeholder="pawmart123"
                type={showPw ? 'text' : 'password'}
                className="input pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full justify-center py-3" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Signing in…
              </span>
            ) : (
              <><LogIn className="w-4 h-4" /> Sign In</>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 pt-2">
            <a href="/" className="hover:underline text-brand-500">← Back to storefront</a>
          </p>
        </form>
      </div>
    </div>
  )
}
