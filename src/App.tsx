import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import AdminView from './components/AdminView'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tarefas from './components/Tarefas'
import Diagnostico from './components/Diagnostico'
import PlanoAcao from './components/PlanoAcao'
import Arsenal from './components/Arsenal'
import LinksRapidos from './components/LinksRapidos'
import Alvos from './components/Alvos'
import AbordagemComercial from './components/AbordagemComercial'
import InstagramBraun from './components/InstagramBraun'
import IcpBraun from './components/IcpBraun'
import ProvaFocal from './components/ProvaFocal'
import MinhaJornada from './components/MinhaJornada'
import Footer from './components/Footer'
import HelpButton from './components/HelpButton'

function AppContent() {
  const { user, member, loading } = useAuth()
  const [view, setView] = useState<'main' | 'admin'>('main')

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Login />

  if (view === 'admin' && member?.is_admin) {
    return <AdminView onBack={() => setView('main')} />
  }

  return (
    <div className="min-h-screen">
      <Navbar
        onAdminClick={member?.is_admin ? () => setView('admin') : undefined}
      />
      <Hero />
      <Tarefas />
      <Diagnostico />
      <PlanoAcao />
      <Arsenal />
      <LinksRapidos />
      <Alvos />
      <AbordagemComercial />
      <InstagramBraun />
      <IcpBraun />
      <ProvaFocal />
      <MinhaJornada />
      <Footer />
      <HelpButton />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
