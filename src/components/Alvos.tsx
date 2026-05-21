import { MapPin, TrendingUp, CheckCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react'

const ancoras = [
  { initials: 'B',  color: 'bg-gold-500',    name: 'Banrisul Três Coroas',  segment: 'Agência Bancária',    margem: '69%' },
  { initials: 'HH', color: 'bg-forest-600',  name: 'Hanna Hotéis',          segment: 'Rede Hoteleira',       margem: '41%' },
  { initials: 'HG', color: 'bg-forest-500',  name: 'Hortencias Garden',     segment: 'Espaço de Eventos',   margem: '40%' },
  { initials: 'P',  color: 'bg-forest-700',  name: 'Pedro',                 segment: 'Cliente Premium',     margem: '38%' },
]

export default function Alvos() {
  return (
    <section id="alvos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Oportunidades abertas</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Alvos Estratégicos</h2>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            <strong>Ambos os alvos têm processo aberto.</strong> Snowland: ligou em 12/05, porta aberta para proposta atualizada. Isso não é cold call — é finalização.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* Snowland */}
          <div className="bg-forest-800 rounded-2xl overflow-hidden">
            <div className="p-6 text-white">
              <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                PROCESSO ABERTO — RETOMADA
              </span>
              <h3 className="text-2xl font-bold mb-1">Snowland</h3>
              <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
                <MapPin size={12} /> Gramado, RS — ~40km/visita
              </div>

              <div className="grid grid-cols-3 gap-3 text-center bg-forest-900/40 rounded-xl p-4 mb-5">
                {[
                  { v: 'R$ 8.800', l: 'Projeção/mês' },
                  { v: '49%',      l: 'Margem' },
                  { v: 'R$ 7.500', l: 'Piso mín.' },
                ].map(item => (
                  <div key={item.l}>
                    <div className="text-gold-500 text-lg font-bold">{item.v}</div>
                    <div className="text-white/40 text-xs mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <TrendingUp size={10} /> RISCO BAIXO — Deslocamento controlado
              </span>

              <ul className="flex flex-col gap-1.5 mb-5">
                {[
                  { text: 'Relacionamento existente com o local', ok: true },
                  { text: 'Portfólio de hotéis preparado', ok: true },
                  { text: 'Ligar até 25/05 para agendar visita', ok: false, gold: true },
                ].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                    {s.gold
                      ? <Clock size={12} className="text-gold-400 shrink-0" />
                      : <CheckCircle size={12} className="text-green-400 shrink-0" />}
                    {s.text}
                  </li>
                ))}
              </ul>

              <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                Gerar Proposta <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* H. Buona Vitta */}
          <div className="bg-forest-800 rounded-2xl overflow-hidden">
            <div className="p-6 text-white">
              <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                ALTA OPORTUNIDADE
              </span>
              <h3 className="text-2xl font-bold mb-1">H. Buona Vitta</h3>
              <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
                <MapPin size={12} /> Serra Gaúcha — confirmar localização
              </div>

              <div className="grid grid-cols-3 gap-3 text-center bg-forest-900/40 rounded-xl p-4 mb-5">
                {[
                  { v: 'R$ 14.632', l: 'Projeção/mês' },
                  { v: '49%',       l: 'Margem' },
                  { v: 'R$ 12.000', l: 'Piso mín.' },
                ].map(item => (
                  <div key={item.l}>
                    <div className="text-gold-500 text-lg font-bold">{item.v}</div>
                    <div className="text-white/40 text-xs mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <AlertTriangle size={10} /> RISCO MODERADO — Confirmar rota
              </span>

              <ul className="flex flex-col gap-1.5 mb-5">
                {[
                  { text: 'Maior potencial de receita da lista', ok: true },
                  { text: 'Margem de 49% mesmo com deslocamento', ok: true },
                  { text: 'Confirmar localização antes da proposta', warn: true },
                  { text: 'Primeiro contato até 27/05', gold: true },
                ].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                    {s.warn
                      ? <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                      : s.gold
                      ? <Clock size={12} className="text-gold-400 shrink-0" />
                      : <CheckCircle size={12} className="text-green-400 shrink-0" />}
                    {s.text}
                  </li>
                ))}
              </ul>

              <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                Gerar Proposta <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <p className="font-bold text-forest-900">Clientes de Alta Margem — Porta de Entrada para Novos Contratos</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ancoras.map((a, i) => (
            <div key={i} className="bg-[#F4F6F0] rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${a.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                {a.initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-forest-900 text-sm truncate">{a.name}</p>
                <p className="text-gray-500 text-xs">{a.segment}</p>
                <span className="inline-block bg-gold-100 text-gold-600 text-xs font-bold px-2 py-0.5 rounded-full mt-1">{a.margem} margem</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
