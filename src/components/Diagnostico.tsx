import { ClipboardList, BarChart2, FileText, Video, ExternalLink, Brain } from 'lucide-react'

const cards = [
  {
    icon: ClipboardList,
    badge: 'FORMULÁRIO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Diagnóstico 360° — Perfil Completo',
    desc: 'Tempo de mercado, faturamento, equipe, reserva financeira, presença digital e trava central identificada.',
    link: { label: 'Abrir', href: 'https://drive.google.com/drive/folders/1jConggzwGbXtLDuR1bKvtYl6g50VPQYP' },
  },
  {
    icon: BarChart2,
    badge: '20/05/2026',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Análise Financeira — Clientes e Margens',
    desc: 'R$ 15.945/mês. 11 clientes com prejuízo. 4 clientes âncora. Causa raiz: deslocamento devora margem.',
    link: { label: 'Abrir', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
  },
  {
    icon: FileText,
    badge: '21/05/2026',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Análise de Propostas e Conversas',
    desc: 'Snowland (retomada ativa), H. Buona Vitta (piso calculado), erro de planilha corrigido, mindset shift confirmado.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1zOBRpmsrLw1t08Vz1g9lZeGHSiM3bYm9Vyg3YgfDdWQ' },
  },
  {
    icon: Video,
    badge: 'SESSÃO 1 — 11/05',
    badgeColor: 'bg-gold-100 text-yellow-700',
    title: 'Sessão Individual — Precificação e Prospecção',
    desc: 'Precificação consciente, prospecção ativa, método SPIN Selling, CRM básico, posicionamento empresarial.',
    link: { label: 'Ver Materiais', href: 'https://drive.google.com/drive/folders/1p2IM_g3lwr9-nK1GMEqRAw7pIirwWfLG' },
  },
]

export default function Diagnostico() {
  return (
    <section id="diagnostico" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Radiografia do negócio</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Meu Diagnóstico</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-forest-100 p-2 rounded-xl shrink-0">
                    <Icon size={18} className="text-forest-700" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-forest-900 text-sm mb-1">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
                <a href={c.link.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-forest-700 hover:text-forest-900 text-sm font-semibold transition-colors w-fit">
                  {c.link.label} <ExternalLink size={12} />
                </a>
              </div>
            )
          })}
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 border-l-4 border-gold-500">
          <div className="flex items-start gap-3">
            <Brain size={20} className="text-gold-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Trava Central Identificada</p>
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-gold-500 font-semibold">"Medo da falta"</span> — insegurança financeira que faz ceder no preço nos primeiros "nãos", mesmo que a maioria aceite sem reclamar.
              </p>
              <p className="text-gold-400 text-sm italic mt-3">
                Mindset shift em 14/05: "Eu era muito reativo. Agora estou passando na frente dos locais, pensando em bater na porta, oferecer o trabalho."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
