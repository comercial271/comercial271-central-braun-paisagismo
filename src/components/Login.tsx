import { useState } from 'react'
import { Leaf, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    if (error) setError('E-mail ou senha incorretos.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-forest-800 p-2.5 rounded-xl">
            <Leaf size={22} className="text-gold-500" />
          </div>
          <div>
            <p className="font-bold text-forest-900 text-lg leading-tight">Central de Comando</p>
            <p className="text-xs text-gray-400">Selva Premium — área exclusiva</p>
          </div>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-forest-900 uppercase tracking-wider block mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-400 transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-forest-900 uppercase tracking-wider block mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-red-500 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-800 hover:bg-forest-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn size={16} />
            )}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          Acesso exclusivo para membros da Selva Premium.<br />
          Esqueceu a senha? Fale com a Juliana.
        </p>
      </div>
    </div>
  )
}
