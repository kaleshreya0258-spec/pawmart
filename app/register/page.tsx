'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 6 characters', ok: password.length >= 6 },
    { label: 'Contains a number',      ok: /\d/.test(password) },
    { label: 'Contains uppercase',     ok: /[A-Z]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const bar = ['bg-red-400', 'bg-yellow-400', 'bg-green-400'][score - 1] || 'bg-gray-200'

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < score ? bar : 'bg-gray-200'}`} />
        ))}
      </div>
      <ul className="space-y-0.5">
        {checks.map(c => (
          <li key={c.label} className={`text-xs flex items-center gap-1 ${c.ok ? 'text-green-600' : 'text-gray-400'}`}>
            <CheckCircle className={`w-3 h-3 ${c.ok ? 'text-green-500' : 'text-gray-300'}`} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Please enter your full name.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (!agreed) return setError('Please agree to the Terms & Privacy Policy.')

    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    // Demo: registration always succeeds
    document.cookie = `pawmart_user=${encodeURIComponent(form.email)}; path=/; max-age=86400`
    router.push('/?welcome=1')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-5xl">🐾</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Join PawMart</h1>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Create your free account in seconds</p>
        </div>

        {/* Benefits strip */}
        <div className="flex justify-around bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-6 text-center shadow-sm">
          {[
            { emoji: '🚚', text: 'Free delivery' },
            { emoji: '🎁', text: '10% off first order' },
            { emoji: '🐾', text: 'Pet profiles' },
          ].map(b => (
            <div key={b.text}>
              <div className="text-xl">{b.emoji}</div>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">{b.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleRegister} className="card p-8 space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
            <input
              type="text"
              className="input"
              placeholder="Priya Sharma"
              value={form.name}
              onChange={set('name')}
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="input pr-10"
                placeholder="Create a strong password"
                value={form.password}
                onChange={set('password')}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrength password={form.password} />
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm password</label>
            <input
              type={showPw ? 'text' : 'password'}
              className={`input ${form.confirm && form.confirm !== form.password ? 'border-red-300 focus:ring-red-400' : ''}`}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set('confirm')}
              required
              autoComplete="new-password"
            />
            {form.confirm && form.confirm !== form.password && (
              <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
            )}
          </div>

          {/* Agree */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-brand-500 rounded shrink-0"
            />
            <span className="text-sm text-gray-600 leading-snug">
              I agree to PawMart's{' '}
              <a href="#" className="text-brand-500 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-brand-500 hover:underline">Privacy Policy</a>
            </span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Creating account…
              </span>
            ) : (
              <><UserPlus className="w-4 h-4" /> Create Account</>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-3">
          <Link href="/" className="hover:underline">← Back to storefront</Link>
        </p>
      </div>
    </div>
  )
}
