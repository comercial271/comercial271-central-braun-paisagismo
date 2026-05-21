import { useState } from 'react'
import { HelpCircle, X, CheckSquare, FolderOpen, Link, Target, Instagram, Star, MessageSquare, Map, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'

interface Section {
  id: string
  icon: React.ElementType
  title: string
  navLabel: string
  steps: string[]
}

const sections: Section[] = [
  {
    id: 'tarefas',
    icon: CheckSquare,
    title: 'Tarefas — Missão do Momento',
    navLabel: 'Tarefas',
    steps: [
      'Clique no círculo à esquerda de cada tarefa para marcá-la como concluída. O progresso aparece na barra no topo.',
      'Clique em "Anotações e Anexos" para expandir o painel de cada tarefa.',
      'Digite suas anotações — são salvas automaticamente enquanto você escreve.',
      'Para anexar arquivo (foto, PDF, planilha): clique em "Anexar arquivo". Máximo 3MB por arquivo.',
      'Arquivos maiores que 3MB: suba no Google Drive e cole o link nas anotações.',
      'Tudo fica salvo no navegador (localStorage) — persiste entre sessões, no mesmo dispositivo.',
    ],
  },
  {
    id: 'arsenal',
    icon: FolderOpen,
    title: 'Arsenal — Documentos e Ferramentas',
    navLabel: 'Arsenal',
    steps: [
      'Clique em qualquer botão "Abrir" para acessar o documento no Drive ou no Gerador Selva.',
      'O Gerador de Propostas Selva é exclusivo para membros Premium — use para criar propostas profissionais em minutos.',
      'Portfólios Residencial, Condomínios e Empresas estão prontos para enviar a clientes.',
    ],
  },
  {
    id: 'links',
    icon: Link,
    title: 'Links Rápidos — Acesso Direto',
    navLabel: 'Links Rápidos',
    steps: [
      'Drive Diego: clique em qualquer pasta para abrir diretamente no Google Drive.',
      'Mídia Kit por Nicho: para cada nicho (Residencial, Condomínios, Empresas), clique no ícone de lápis ✎ para colar o link do PDF gerado no Selva Propostas.',
      'Fluxo do Mídia Kit: gere no Selva Propostas → salve como PDF no Drive → copie o link → cole aqui.',
      'O link salvo fica disponível para acesso rápido futuro — persiste no dispositivo.',
    ],
  },
  {
    id: 'instagram',
    icon: Instagram,
    title: 'Instagram — Banco de Conteúdo',
    navLabel: 'Instagram',
    steps: [
      'Os 5 pilares mostram os tipos de conteúdo recomendados — clique em "ver detalhes" para ver exemplos de gancho e formato.',
      'Clique em um pilar para filtrar as 20 ideias do banco de conteúdo.',
      'Banco de ideias: cada card tem o gancho (primeira linha do post) e o roteiro visual.',
      'Quando publicar uma ideia: clique no círculo à esquerda para marcá-la como "publicado". A barra de progresso avança.',
      'Use o Calendário Semanal como guia de frequência mínima.',
    ],
  },
  {
    id: 'icp',
    icon: Target,
    title: 'ICP / Leads — Qualificador de Prospects',
    navLabel: 'ICP / Leads',
    steps: [
      'Preencha o nome e segmento do prospect que você quer avaliar.',
      'Responda as 8 perguntas clicando em Sim ou Não. Você pode mudar a resposta a qualquer momento.',
      'Após responder todas, clique em "Ver resultado" para ver a pontuação e a recomendação (verde/amarelo/vermelho).',
      'Clique em "Salvar na lista" para guardar o prospect na lista do lado. Os leads salvos ficam registrados com data e pontuação.',
      'Para remover um lead da lista: clique no ícone de lixeira no card.',
    ],
  },
  {
    id: 'prova-social',
    icon: Star,
    title: 'Prova Social — Cases e Avaliações',
    navLabel: 'Prova Social',
    steps: [
      'Cases B2B: clique em "Antes/Depois + Depoimento" em qualquer card para expandir.',
      'Foto ANTES / DEPOIS: clique na área pontilhada, cole o link da foto (Drive, Google Fotos, qualquer URL pública). A foto aparece no card.',
      'Para trocar uma foto: passe o mouse sobre ela e clique em "Trocar link".',
      'Depoimento: cole o texto do cliente (print de WhatsApp, avaliação Google, e-mail) no campo de depoimento. Adicione o nome e cargo no campo abaixo.',
      'Meta de Avaliações Google: clique no número atual (ex: "10") para editar. Atualize sempre que receber nova avaliação.',
    ],
  },
  {
    id: 'jornada',
    icon: TrendingUp,
    title: 'Jornada — Evolução e ROI',
    navLabel: 'Jornada',
    steps: [
      'Barra de progresso: mostra quanto falta para a meta de R$50.000/mês. Atualiza automaticamente conforme você registra novos meses.',
      'Evolução do Faturamento: clique em "Novo mês" para registrar o faturamento de cada mês. O gráfico de barras cresce com o tempo.',
      'Contratos Fechados: cada contrato novo que você fechar durante o programa, registre aqui com nome do cliente e valor mensal.',
      'ROI do Programa: assim que registrar contratos, o cálculo aparece automaticamente — quanto você gerou para cada R$1 investido na Selva.',
      'O que você já recebeu: tabela com o valuation de mercado de cada entrega da mentoria — use para comparar o valor real recebido com o que pagou.',
      'Dados ficam salvos no navegador. Atualize após cada novo contrato fechado ou fechamento de mês.',
    ],
  },
  {
    id: 'geral',
    icon: MessageSquare,
    title: 'Informações Gerais',
    navLabel: '',
    steps: [
      'Todos os dados inseridos (notas, fotos, tarefas concluídas, leads, ideias publicadas) ficam salvos no navegador deste dispositivo.',
      'Se acessar de outro dispositivo ou navegador, os dados não aparecem — use sempre o mesmo dispositivo para manter o histórico.',
      'A Central é atualizada automaticamente pelo time Selva conforme o acompanhamento avança.',
      'Dúvidas ou sugestões: fale com a Juliana via WhatsApp da mentoria.',
      'Check-in: 11/06/2026 — chegue com o máximo de tarefas marcadas e cases documentados.',
    ],
  },
]

export default function HelpButton() {
  const [open, setOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('tarefas')

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-forest-800 hover:bg-forest-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Ajuda — como usar esta central"
      >
        <HelpCircle size={22} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="relative bg-white w-full sm:max-w-xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[80vh] rounded-t-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div>
                <p className="font-bold text-forest-900 text-base">Como usar esta Central</p>
                <p className="text-gray-400 text-xs mt-0.5">Guia de uso — Braun Paisagismo</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-4 py-4 space-y-2">
              {sections.map(s => {
                const isExpanded = expandedSection === s.id
                const Icon = s.icon
                return (
                  <div key={s.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(prev => prev === s.id ? null : s.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-forest-100 p-1.5 rounded-lg shrink-0">
                          <Icon size={15} className="text-forest-700" />
                        </div>
                        <p className="font-semibold text-forest-900 text-sm text-left">{s.title}</p>
                      </div>
                      {isExpanded ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-gray-50 bg-gray-50/50">
                        <ol className="space-y-2">
                          {s.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="shrink-0 w-5 h-5 bg-forest-700 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                              <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-forest-50">
              <div className="flex items-center gap-2">
                <Map size={14} className="text-forest-600 shrink-0" />
                <p className="text-xs text-forest-700">
                  Clique em qualquer seção do menu para navegar rapidamente.
                  Dados salvos localmente neste dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
