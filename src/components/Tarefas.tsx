import { Circle, AlertTriangle, ExternalLink, Calendar } from 'lucide-react'

const tarefas = [
  {
    prazo: '22/05 — QUINTA',
    urgencia: 'red',
    titulo: 'Identificar os 5 clientes com maior prejuízo',
    descricao: 'Com base na planilha de análise de clientes, selecionar os 5 que mais drenam margem. Redigir mensagem de desligamento ou reajuste. Estes clientes estão travando seu crescimento.',
    nota: 'Guilherme Perobelli (-38%), Jonatas (-41%) e Cond. Casa e Gramado (-26%) já foram identificados na análise de 20/05.',
    link: { label: 'Ver Planilha de Clientes', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
  },
  {
    prazo: '22/05 — QUINTA',
    urgencia: 'red',
    titulo: 'Reajustar clientes com margem baixa (+25% mínimo)',
    descricao: 'Para os clientes que ficam — não os que serão demitidos — aplicar reajuste de no mínimo 25%. Lembre: a maioria aceita sem reclamar. O medo é seu, não deles.',
    nota: 'Dado crítico do seu diagnóstico: "A maioria aceita sem reclamar" — você mesmo disse isso.',
    link: null,
  },
  {
    prazo: '25/05 — DOMINGO',
    urgencia: 'orange',
    titulo: 'Primeiro contato com Snowland',
    descricao: 'Ligar ou visitar pessoalmente para retomar o processo. Eles já conhecem seu trabalho — você ligou em 12/05 e disseram que o processo ainda está aberto. Isso é uma retomada, não prospecção fria.',
    nota: 'Piso recomendado: R$ 7.500/mês | Projeção: R$ 8.800/mês (49% de margem) | Deslocamento: ~40km/visita — controlado.',
    link: { label: 'Gerar Proposta Snowland', href: 'https://geradordepropostaselva.lovable.app' },
  },
  {
    prazo: '27/05 — TERÇA',
    urgencia: 'orange',
    titulo: 'Primeiro contato com H. Buona Vitta',
    descricao: 'Marcar visita de diagnóstico. Confirmar localização exata antes de fechar proposta — deslocamento de 57km/visita pode impactar a margem.',
    nota: 'Piso recomendado: R$ 12.000/mês | Projeção: R$ 14.632/mês (49% de margem). Confirmar que fica em rota com outros clientes.',
    link: { label: 'Gerar Proposta H. Buona Vitta', href: 'https://geradordepropostaselva.lovable.app' },
  },
  {
    prazo: '30/05 — SEXTA',
    urgencia: 'yellow',
    titulo: 'Campanha Indique e Ganhe com os 4 clientes âncora',
    descricao: 'Seus 4 clientes de maior margem têm rede. Uma mensagem personalizada para cada um pedindo indicação pode gerar leads qualificados sem custo de aquisição.',
    nota: 'Clientes âncora: Banrisul (69%), Hortencias Garden (40%), Pedro (38%), Hanna Hotéis (41%). São eles que devem abrir portas para os próximos contratos.',
    link: null,
  },
]

const urgenciaConfig: Record<string, { bg: string; text: string; border: string }> = {
  red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
}

export default function Tarefas() {
  return (
    <section id="tarefas" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Compromissos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Missão do Momento</h2>
          <p className="text-gray-500 mt-2">Seus compromissos até o check-in de 03/06/2026</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 text-white flex items-start gap-4">
          <AlertTriangle className="text-gold-500 shrink-0 mt-0.5" size={22} />
          <div>
            <p className="font-bold text-lg">Semana decisiva — 22 a 30/05/2026</p>
            <p className="text-white/70 text-sm mt-1">Cinco movimentos que podem mudar definitivamente o seu faturamento. Não adie.</p>
            <p className="mt-2 text-gold-500 text-sm font-semibold">0 / 5 concluídas — check-in em 11/06</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {tarefas.map((t, i) => {
            const u = urgenciaConfig[t.urgencia]
            return (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex gap-4">
                <div className="shrink-0 mt-1">
                  <Circle size={28} className="text-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${u.bg} ${u.text}`}>
                      {t.prazo}
                    </span>
                  </div>
                  <h3 className="font-bold text-forest-900 text-base mb-1">{t.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{t.descricao}</p>
                  <div className={`border-l-4 border-gold-500 bg-gold-100 pl-3 py-1.5 rounded-r-lg mb-3`}>
                    <p className="text-xs text-forest-800 font-medium">{t.nota}</p>
                  </div>
                  {t.link && (
                    <a
                      href={t.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-forest-700 font-semibold hover:text-forest-900 underline underline-offset-2"
                    >
                      {t.link.label} <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3 items-start">
          <Calendar size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">Check-in com a Juliana: 11/06/2026</p>
            <p className="text-amber-700 text-sm mt-0.5">Chegue com o resultado das 5 ações. O próximo passo depende do que você fizer esta semana.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
