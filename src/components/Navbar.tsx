import { useState, useEffect } from 'react'
import { Menu, X, Leaf } from 'lucide-react'

const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'tarefas', label: 'Tarefas' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'plano', label: 'Plano de Ação' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'alvos', label: 'Alvos' },
  { id: 'abordagem', label: 'Abordagem Comercial' },
  { id: 'prova-social', label: 'Prova Social' },
]

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollY = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollY) {
          setActive(navItems[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Leaf className="text-gold-500" size={20} />
          <span className="text-white font-bold text-sm tracking-wide">BRAUN PAISAGISMO</span>
          <span className="hidden sm:inline-block ml-2 text-xs bg-gold-500 text-forest-900 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Selva Premium</span>
        </div>
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                active === item.id
                  ? 'bg-gold-500 text-forest-900'
                  : 'text-white/80 hover:text-white hover:bg-forest-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-forest-900 border-t border-forest-700 px-4 py-3 flex flex-col gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active === item.id ? 'bg-gold-500 text-forest-900' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
