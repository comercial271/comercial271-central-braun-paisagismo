import { ClipboardList, BarChart2, FileText, Video, ExternalLink, Brain } from 'lucide-react'

const cards = [
  {
    icon: ClipboardList,
    badge: 'FORMULÁRIO — PREENCHIDO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Diagnóstico 360° — Perfil Completo',
    desc: 'Suas respostas do formulário de entrada: tempo de mercado, faturamento, equipe, reserva financeira, presença digital, diferenciais e trava central identificada.',
    link: { label: 'Abrir Diagnóstico', href: 'https://drive.google.com/drive/folders/1jConggzwGbXtLDuR1bKvtYl6g50VPQYP' },
    tags: ['Diagnóstico', 'Perfil', '360°'],
  },
  {
    icon: BarChart2,
    badge: 'ANÁLISE — 20/05/2026',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Análise Financeira — Clientes e Margens',
    desc: 'Faturamento real R$ 15.945/mês. 11 clientes com prejuízo identificados. 4 clientes âncora identificados. Causa raiz: 4 visitas/mês + longa distância = deslocamento devora margem.',
    link: { label: 'Abrir Planilha', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
    tags: ['Financeiro', 'Margens', 'Clientes'],
  },
  {
    icon: FileText,
    badge: 'ANÁLISE — 21/05/2026',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Análise Completa de Propostas e Conversas',
    desc: 'Diagnóstico dos áudios e conversas de 12–14/05: Snowland (retomada ativa), H. Buona Vitta (piso calculado), erro de planilha corrigido, mindset shift confirmado.',
    link: { label: 'Abrir Análise', href: 'https://docs.google.com/document/d/1zOBRpmsrLw1t08Vz1g9lZeGHSiM3bYm9Vyg3YgfDdWQ' },
    tags: ['Propostas', 'Análise', 'Mindset'],
  },
  {
    icon: Video,
    badge: 'SESSÃO 1 — 11/05/2026',
    badgeColor: 'bg-gold-100 text-yellow-700',
    title: 'Sessão Individual — Precificação e Prospecção',
    desc: 'Temas cobertos: precificação consciente, prospecção ativa, método SPIN Selling, estrutura de CRM básico, posicionamento empresarial.',
    link: { label: 'Ver Materiais da Sessão', href: 'https://drive.google.com/drive/folders/1p2IM_g3lwr9-nK1GMEqRAw7pIirwWfLG' },
    tags: ['Sessão', 'SPIN', 'Precificação'],
  },
]

export default function Diagnostico() {
  return (
    <section id="diagnostico" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Radiografia do negócio</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Meu Diagnóstico</h2>
          <p className="text-gray-500 mt-2">A radiografia completa do seu negócio — mai/2026</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-forest-100 p-2 rounded-lg shrink-0">
                    <Icon size={20} className="text-forest-700" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
                  </div>
                </div>
                <h3 className="font-bold text-forest-900">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{c.desc}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {c.tags.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors w-fit"
                >
                  {c.link.label} <ExternalLink size={13} />
                </a>
              </div>
            )
          })}
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 border-l-4 border-gold-500">
          <div className="flex items-start gap-3">
            <Brain size={22} className="text-gold-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Trava Central Identificada</p>
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-gold-500 font-semibold">"Medo da falta"</span> — a insegurança financeira faz você ceder no preço nos primeiros "nãos", mesmo que a maioria aceite sem reclamar. Contradição direta entre realidade e comportamento.
              </p>
              <p className="text-gold-400 text-sm italic mt-3">
                Mindset shift confirmado em 14/05: "Eu era muito reativo. Agora estou passando na frente dos locais, pensando em bater na porta, oferecer o trabalho."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
