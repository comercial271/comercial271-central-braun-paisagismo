import { Zap, Home, Building, Briefcase, List, Star, FileText, FolderOpen, ExternalLink } from 'lucide-react'

const docs = [
  {
    icon: Home,
    badge: 'ENVIADO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Portfólio Residencial',
    desc: 'PDF profissional com fotos antes/depois. Projetos residenciais premium na Serra Gaúcha.',
    link: { label: 'Abrir Portfólio', href: 'https://drive.google.com/file/d/1w_4t063chK_XMIWBEymrn9CXr2Hw-ZyA' },
    tags: ['Portfólio', 'Residencial', 'PDF'],
  },
  {
    icon: Building,
    badge: 'ENVIADO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Portfólio Condomínios',
    desc: 'Cases de condomínios residenciais com manutenção preventiva e gestão de jardins.',
    link: { label: 'Abrir Portfólio', href: 'https://drive.google.com/file/d/1fvV9-kpTEa2eaW0BqDNYTp1U5dGpTk7p' },
    tags: ['Portfólio', 'Condomínios', 'PDF'],
  },
  {
    icon: Briefcase,
    badge: 'ENVIADO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Portfólio Empresas',
    desc: 'Cases corporativos: bancos, hotéis, estabelecimentos comerciais. Principal diferencial B2B.',
    link: { label: 'Abrir Portfólio', href: 'https://drive.google.com/file/d/1GeisOZ-Je3cgaYoL3BAnvtmrbcCR4iJj' },
    tags: ['Portfólio', 'Empresas', 'B2B'],
  },
  {
    icon: List,
    badge: 'ENVIADO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Lista de Clientes com Análise de Custo',
    desc: 'Planilha completa com todos os clientes, custo por visita, margem real e análise de rentabilidade.',
    link: { label: 'Abrir Lista', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
    tags: ['Financeiro', 'Clientes', 'Planilha'],
  },
  {
    icon: Star,
    badge: 'ENVIADO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Avaliações Google',
    desc: '10+ avaliações organizadas, incluindo avaliação nova de Noeli Scheifler. Arsenal de prova social.',
    link: { label: 'Abrir Avaliações', href: 'https://drive.google.com/drive/folders/1PtzJX0AXk0dZRbpb1ehonC9mSuqza9P2' },
    tags: ['Avaliações', 'Google', 'Prova Social'],
  },
  {
    icon: FileText,
    badge: 'REFERÊNCIA',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    title: 'Proposta Teste — Gerador Selva',
    desc: 'Primeira proposta gerada no sistema Selva. Valor: R$ 1.200 com 20% de desconto. Referência de formato.',
    link: { label: 'Abrir Proposta', href: 'https://drive.google.com/file/d/1ByMctx8MK4bDDdmT5QeR_TLABKAWDiDh' },
    tags: ['Proposta', 'Teste', 'Formato'],
  },
]

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Ferramentas e documentos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Seu Arsenal</h2>
          <p className="text-gray-500 mt-2">Ferramentas, portfólios e documentos — tudo o que você tem para apresentar</p>
        </div>

        {/* Gerador de Propostas — destaque */}
        <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 mb-10 text-white">
          <div className="flex items-start gap-4">
            <div className="bg-gold-500/20 p-3 rounded-xl shrink-0">
              <Zap size={28} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                FERRAMENTA EXCLUSIVA SELVA PREMIUM
              </span>
              <h3 className="text-2xl font-bold mb-2">Gerador de Propostas Selva</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xl">
                Gere propostas profissionais em minutos. Personalize para cada cliente, inclua portfólio, valores e condições. Apresentação que posiciona você como empresa, não como autônomo.
              </p>
              <a
                href="https://geradordepropostaselva.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Abrir Gerador de Propostas <ExternalLink size={14} />
              </a>
              <p className="text-white/40 text-xs mt-3">Acesso exclusivo para membros Selva Premium</p>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <h3 className="font-bold text-forest-900 text-lg mb-5">Documentos Que Você Enviou</h3>
        <p className="text-gray-500 text-sm mb-6 -mt-3">Material entregue muito além dos commitments — esse é o seu diferencial</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {docs.map((d, i) => {
            const Icon = d.icon
            return (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-forest-100 p-2 rounded-lg shrink-0">
                    <Icon size={16} className="text-forest-700" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${d.badgeColor}`}>{d.badge}</span>
                </div>
                <h4 className="font-bold text-forest-900 text-sm">{d.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{d.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {d.tags.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href={d.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors w-fit"
                >
                  {d.link.label} <ExternalLink size={11} />
                </a>
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <FolderOpen size={20} className="text-forest-700 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-forest-900 text-sm">Pasta Completa — Propostas e Portfólios</p>
            <p className="text-gray-500 text-xs">Todos os arquivos organizados por categoria</p>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1Sj-Pcfvy750gg2-0UC9pEK1ZiK4seEOX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            Abrir Pasta <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </section>
  )
}
