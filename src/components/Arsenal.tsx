import { Zap, Home, Building, Briefcase, List, Star, FileText, FolderOpen, ExternalLink } from 'lucide-react'

const docs = [
  {
    icon: Home,
    title: 'Portfólio Residencial',
    desc: 'Projetos residenciais premium na Serra Gaúcha — fotos antes/depois.',
    link: { label: 'Abrir', href: 'https://drive.google.com/file/d/1w_4t063chK_XMIWBEymrn9CXr2Hw-ZyA' },
  },
  {
    icon: Building,
    title: 'Portfólio Condomínios',
    desc: 'Cases de condomínios com manutenção preventiva e gestão de jardins.',
    link: { label: 'Abrir', href: 'https://drive.google.com/file/d/1fvV9-kpTEa2eaW0BqDNYTp1U5dGpTk7p' },
  },
  {
    icon: Briefcase,
    title: 'Portfólio Empresas',
    desc: 'Cases corporativos: bancos, hotéis, estabelecimentos comerciais.',
    link: { label: 'Abrir', href: 'https://drive.google.com/file/d/1GeisOZ-Je3cgaYoL3BAnvtmrbcCR4iJj' },
  },
  {
    icon: List,
    title: 'Lista de Clientes — Análise de Custo',
    desc: 'Todos os clientes, custo por visita, margem real e rentabilidade.',
    link: { label: 'Abrir', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
  },
  {
    icon: Star,
    title: 'Avaliações Google',
    desc: '10+ avaliações organizadas incluindo Noeli Scheifler — prova social.',
    link: { label: 'Abrir', href: 'https://drive.google.com/drive/folders/1PtzJX0AXk0dZRbpb1ehonC9mSuqza9P2' },
  },
  {
    icon: FileText,
    title: 'Proposta Teste — Formato Referência',
    desc: 'Primeira proposta gerada no Selva. R$ 1.200 com 20% de desconto.',
    link: { label: 'Abrir', href: 'https://drive.google.com/file/d/1ByMctx8MK4bDDdmT5QeR_TLABKAWDiDh' },
  },
]

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Ferramentas e documentos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Seu Arsenal</h2>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="bg-gold-500/20 p-3 rounded-xl shrink-0">
            <Zap size={24} className="text-gold-500" />
          </div>
          <div className="flex-1">
            <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5">
              EXCLUSIVO SELVA PREMIUM
            </span>
            <h3 className="text-white font-bold text-lg">Gerador de Propostas Selva</h3>
            <p className="text-white/60 text-sm mt-0.5">Propostas profissionais em minutos — posiciona você como empresa, não autônomo</p>
          </div>
          <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0">
            Abrir Gerador <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {docs.map((d, i) => {
            const Icon = d.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-3">
                <div className="bg-forest-100 p-2 rounded-xl shrink-0 mt-0.5">
                  <Icon size={15} className="text-forest-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-forest-900 text-sm leading-snug mb-0.5">{d.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{d.desc}</p>
                  <a href={d.link.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-900 text-xs font-semibold transition-colors">
                    {d.link.label} <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
          <FolderOpen size={18} className="text-forest-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-forest-900 text-sm">Pasta Completa — Propostas e Portfólios</p>
            <p className="text-gray-400 text-xs">Todos os arquivos organizados por categoria</p>
          </div>
          <a href="https://drive.google.com/drive/folders/1Sj-Pcfvy750gg2-0UC9pEK1ZiK4seEOX" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0">
            Abrir <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </section>
  )
}
