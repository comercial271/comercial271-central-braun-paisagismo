import { Star, ExternalLink, CheckCircle } from 'lucide-react'

const cases = [
  { initials: 'B', color: 'bg-gold-500', name: 'Banrisul Três Coroas', segment: 'Agência Bancária — Três Coroas/RS', note: 'Margem 69% | Contrato ativo', status: '✅ ATIVO', statusColor: 'text-green-700' },
  { initials: 'HH', color: 'bg-forest-600', name: 'Hanna Hotéis', segment: 'Rede Hoteleira — Serra Gaúcha', note: 'Margem 41% | Contrato ativo', status: '✅ ATIVO', statusColor: 'text-green-700' },
  { initials: 'HG', color: 'bg-forest-500', name: 'Hortencias Garden', segment: 'Espaço de Eventos — Gramado/RS', note: 'Margem 40% | Contrato ativo', status: '✅ ATIVO', statusColor: 'text-green-700' },
  { initials: 'SM', color: 'bg-teal-600', name: 'Cond. Saint Moritz', segment: 'Condomínio Residencial Premium', note: 'Case no portfólio', status: '📁 PORTFÓLIO', statusColor: 'text-blue-700' },
  { initials: 'IU', color: 'bg-blue-700', name: 'Igreja Universal Gramado', segment: 'Espaço Institucional — Gramado/RS', note: 'Case no portfólio', status: '📁 PORTFÓLIO', statusColor: 'text-blue-700' },
  { initials: 'SL', color: 'bg-slate-600', name: 'Cemitério São Lorenço', segment: 'Gestão de Área Verde Institucional', note: 'Case no portfólio', status: '📁 PORTFÓLIO', statusColor: 'text-blue-700' },
  { initials: 'EL', color: 'bg-orange-600', name: 'Eletrolar — Várzea Grande', segment: 'Varejo / Comércio', note: 'Case no portfólio', status: '📁 PORTFÓLIO', statusColor: 'text-blue-700' },
  { initials: 'LP', color: 'bg-teal-500', name: 'Cond. Lage de Pedra', segment: 'Condomínio Residencial', note: 'Case no portfólio', status: '📁 PORTFÓLIO', statusColor: 'text-blue-700' },
  { initials: 'SW', color: 'bg-amber-500', name: 'Snowland', segment: 'Parque de Entretenimento — Gramado/RS', note: 'Processo em andamento', status: '⏳ EM NEGOCIAÇÃO', statusColor: 'text-amber-700' },
]

const reviews = [
  { name: 'Noeli Scheifler', date: 'mai/2026', quote: 'Excelente serviço! Profissionalismo e dedicação em cada detalhe. Recomendo fortemente a Braun Paisagismo.', stars: 5 },
  { name: 'Cliente Corporativo', date: '2025–2026', quote: 'Profissionalismo, pontualidade e resultado visual impecável — diferencial que a maioria não entrega.', stars: 5 },
  { name: 'Cliente Serra Gaúcha', date: '2025', quote: 'Equipe uniformizada, atendimento diferenciado. Claramente trabalham como empresa, não como autônomos.', stars: 5 },
]

const diferenciais = [
  'Empresa registrada — não autônomo',
  'Equipe uniformizada',
  'Google Maps ativo com avaliações',
  'Instagram e WhatsApp Business',
  'Veículo com identidade visual da marca',
  'Uso de tráfego pago',
  'Follow-up de orçamentos pendentes',
  'Contratos com clientes B2B',
  'Manutenção preventiva de equipamentos',
  'Software de gestão financeira',
  'Portfólios organizados (3 segmentos)',
  'SPIN Selling incorporado no atendimento',
]

export default function ProvaFocal() {
  return (
    <section id="prova-social" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Credibilidade real</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Arsenal de Prova Social</h2>
          <p className="text-gray-500 mt-2">O que você já construiu — e que a maioria do mercado não tem</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <p className="text-white/80 text-sm leading-relaxed">
            Você tem mais de 8 anos de cases reais. A maioria dos jardineiros da região não tem portfólio organizado, não tem avaliações no Google, não tem contratos com empresas. <span className="text-gold-500 font-semibold">Você tem tudo isso. Use.</span>
          </p>
        </div>

        {/* Cases B2B */}
        <h3 className="font-bold text-forest-900 text-lg mb-5">Cases B2B — Clientes Corporativos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start">
              <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                {c.initials}
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">{c.name}</p>
                <p className="text-gray-500 text-xs">{c.segment}</p>
                <p className="text-gray-400 text-xs mt-0.5">{c.note}</p>
                <span className={`text-xs font-semibold ${c.statusColor}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-12">
          <p className="text-sm text-forest-800 font-medium">Ver todos os portfólios completos →</p>
          <a
            href="https://drive.google.com/drive/folders/1Sj-Pcfvy750gg2-0UC9pEK1ZiK4seEOX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            Abrir Pasta <ExternalLink size={11} />
          </a>
        </div>

        {/* Avaliações Google */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Avaliações Reais de Clientes</h3>
        <p className="text-gray-500 text-sm mb-5">10+ avaliações verificadas no Google Maps. Ferramenta mais poderosa de prova social local.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed mb-3">"{r.quote}"</p>
              <div>
                <p className="font-semibold text-forest-900 text-sm">{r.name}</p>
                <p className="text-gray-400 text-xs">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-forest-800 rounded-xl p-4 flex items-center justify-between mb-12">
          <p className="text-white text-sm font-medium">Ver Todas as Avaliações Google →</p>
          <a
            href="https://drive.google.com/drive/folders/1PtzJX0AXk0dZRbpb1ehonC9mSuqza9P2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-forest-900 text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            Abrir Avaliações <ExternalLink size={11} />
          </a>
        </div>

        {/* Diferenciais */}
        <h3 className="font-bold text-forest-900 text-lg mb-5">O que te separa do mercado</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {diferenciais.map((d, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 border border-gray-100">
              <CheckCircle size={15} className="text-gold-500 shrink-0" />
              <span className="text-sm text-forest-900 font-medium">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
