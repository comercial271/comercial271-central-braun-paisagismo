import { TrendingUp, Target, DollarSign, Clock, Award, Building2 } from 'lucide-react'

const metrics = [
  { value: 'R$ 15.945', label: 'Faturamento atual', sub: 'Mês de referência: mai/2026', icon: DollarSign },
  { value: 'R$ 50.000+', label: 'Meta 12 meses', sub: 'Crescimento necessário: +214%', icon: Target },
  { value: 'R$ 39.377', label: 'Potencial imediato', sub: 'Com Snowland + H. Buona Vitta', icon: TrendingUp },
  { value: '+147%', label: 'Crescimento em 30–60 dias', sub: 'Se fechar os 2 alvos', icon: TrendingUp },
  { value: '8+ anos', label: 'No mercado', sub: 'Fábricas → técnico → paisagismo', icon: Clock },
  { value: 'B2B', label: 'Posicionamento', sub: 'Hotéis, condomínios, empresas', icon: Building2 },
]

export default function Hero() {
  return (
    <section id="inicio" className="pt-16 bg-gradient-to-br from-forest-800 to-forest-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            SELVA PREMIUM — MEMBRO ATIVO
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            Central Braun Paisagismo
          </h1>
          <p className="text-white/70 text-lg mb-2">Diego Braun — Gramado / Serra Gaúcha</p>
          <p className="text-gold-500 text-xl italic font-medium mb-6">
            "De R$ 15.945 para R$ 50.000/mês.<br />O caminho está traçado."
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg">
            Aqui está tudo que foi construído na sua mentoria — diagnóstico, plano de ação,
            documentos, propostas e o arsenal que comprova quem você já é. Use como referência diária.
          </p>
          <div className="mt-8 flex items-center gap-2">
            <Award size={16} className="text-gold-500" />
            <span className="text-white/50 text-xs">Mentoria: Jean Francis | Sessão 1: 11/05/2026 | Check-in: 11/06/2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="bg-forest-700/50 border border-forest-600/40 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-gold-500 text-2xl font-bold mb-1">{m.value}</div>
              <div className="text-white text-sm font-semibold mb-1">{m.label}</div>
              <div className="text-white/50 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
