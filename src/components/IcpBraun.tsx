import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, Target, Trash2, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const ICP_LEADS_KEY    = 'braun_icp_leads_v1'
const ICP_BUILDER_KEY  = 'braun_icp_builder_v1'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BuilderRespostas { [id: string]: string }

interface Pergunta { id: string; texto: string; peso: number; dica: string }

interface Lead {
  id: string; nome: string; tipo: string; score: number; max: number
  respostas: Record<string, boolean>; notas: string; criadoEm: string
}

// ─── ICP Builder questions ────────────────────────────────────────────────────

interface BuilderQ {
  id: string
  num: number
  titulo: string
  pergunta: string
  dica: string
  placeholder: string
}

const builderQuestions: BuilderQ[] = [
  {
    id: 'melhores_clientes',
    num: 1,
    titulo: 'Seus melhores clientes hoje',
    pergunta: 'Pense nos 2 ou 3 clientes que você mais gosta de atender. O que eles têm em comum — tipo de espaço, perfil do responsável, localização, tamanho?',
    dica: 'Não pense no ticket ainda. Pense em quem você atende com orgulho e que indica seu trabalho.',
    placeholder: 'Ex: São condomínios de médio porte em Gramado, com síndico que valoriza a aparência. Têm área de lazer grande e recebem visitas frequentes...',
  },
  {
    id: 'segmento_ideal',
    num: 2,
    titulo: 'O segmento que faz mais sentido',
    pergunta: 'Qual tipo de espaço combina com o que você entrega de melhor: residencial premium, condomínio, hotel/pousada, empresa ou misto? Por que esse e não os outros?',
    dica: 'Considere sua experiência, seus casos de sucesso e onde você consegue cobrar o preço justo.',
    placeholder: 'Ex: Hotéis e pousadas de Serra Gaúcha, porque o jardim é parte do produto deles. Eles entendem que paisagismo valoriza a diária...',
  },
  {
    id: 'dor_principal',
    num: 3,
    titulo: 'A dor que você resolve',
    pergunta: 'O que o seu cliente ideal tinha de problema antes de te contratar? Que situação ele não suportava mais ou que risco ele queria eliminar?',
    dica: 'Vá além do "jardim feio". Pense em vergonha, perda de clientes, síndico pressionado, hóspede reclamando...',
    placeholder: 'Ex: Jardim mal cuidado afastando hóspedes. Fornecedor anterior que sumia, não aparecia, não avisava. Síndico que recebia reclamação toda reunião...',
  },
  {
    id: 'diferencial',
    num: 4,
    titulo: 'Por que te escolhem',
    pergunta: 'Por que o cliente ideal escolhe a Braun e não alguém mais barato? O que você entrega que é difícil de copiar?',
    dica: 'Pode ser confiabilidade, apresentação, proposta visual, empresa registrada, follow-up... o que você ouviu de clientes satisfeitos?',
    placeholder: 'Ex: Empresa registrada, equipe uniformizada, presença constante no Instagram, proposta no papel antes de começar, WhatsApp respondido no mesmo dia...',
  },
  {
    id: 'ticket_minimo',
    num: 5,
    titulo: 'Ticket e modelo de contrato',
    pergunta: 'Qual é o valor mensal mínimo que faz sentido para sua operação hoje, considerando deslocamento, equipe e margem? E qual modelo você prefere — mensal recorrente, por visita, ou misto?',
    dica: 'Não coloque o que o mercado aceita. Coloque o que paga suas contas + gera lucro + te deixa dormir bem.',
    placeholder: 'Ex: Mínimo R$ 1.800/mês para clientes no raio de 30km. Prefiro recorrente mensal porque planejo minha equipe com 2 semanas de antecedência...',
  },
  {
    id: 'localizacao',
    num: 6,
    titulo: 'Onde ele está',
    pergunta: 'Qual é o raio de distância viável para você? Que cidades ou regiões fazem parte da rota ideal da sua operação?',
    dica: 'Considere: deslocamento de ida e volta + tempo da equipe. Acima de quanto km o contrato deixa de valer a pena?',
    placeholder: 'Ex: Três Coroas, Gramado, Canela, Nova Petrópolis — dentro de 50km. Acima disso só vale se for um contrato acima de R$ 3.500...',
  },
  {
    id: 'anti_icp',
    num: 7,
    titulo: 'Quem você NÃO quer mais',
    pergunta: 'Descreva o perfil de cliente que te dá mais dor de cabeça, não valoriza o trabalho ou simplesmente não vale a energia. Quais características te fazem querer recusar?',
    dica: 'Seja honesto. Anti-ICP bem definido te protege de aceitar contratos ruins por medo de não ter demanda.',
    placeholder: 'Ex: Residencial pequeno que só quer uma roçada. Cliente que negocia na hora de pagar. Quem pede desconto antes de ver o serviço. Distância > 70km sem rota...',
  },
  {
    id: 'canal',
    num: 8,
    titulo: 'Como ele te encontra',
    pergunta: 'Como o seu cliente ideal chega até você hoje — Google, indicação, Instagram, prospecção ativa? E onde você deveria estar mais presente para que ele te encontre?',
    dica: 'Pense nas últimas 5 origens de prospect. Qual canal trouxe os melhores contratos?',
    placeholder: 'Ex: Indicação de outros clientes é o principal. Google às vezes. Instagram raramente converte mas posiciona. Prospecção ativa no LinkedIn seria o próximo passo...',
  },
]

// ─── Qualifier questions ───────────────────────────────────────────────────────

const perguntas: Pergunta[] = [
  { id: 'tipo',        texto: 'É empresa, hotel, condomínio ou estabelecimento comercial?', dica: 'Não residencial pequeno — B2B é o foco', peso: 2 },
  { id: 'area',        texto: 'A área verde importa para a imagem do negócio deles?',       dica: 'Hotéis, spas, condos premium, lojas de moda', peso: 2 },
  { id: 'localizacao', texto: 'Fica dentro do raio de distância viável?',                   dica: 'Deslocamento não pode comer a margem', peso: 2 },
  { id: 'ticket',      texto: 'Ticket estimado acima do seu mínimo?',                       dica: 'Contrato abaixo do mínimo não cobre fixo + deslocamento', peso: 2 },
  { id: 'decisor',     texto: 'Você fala direto com quem aprova o contrato?',               dica: 'Intermediário = proposta some sem resposta', peso: 1 },
  { id: 'historico',   texto: 'Eles já tiveram serviço de paisagismo antes?',               dica: 'Já educados para pagar — negociação mais fácil', peso: 1 },
  { id: 'interesse',   texto: 'Demonstraram interesse real (não só curiosidade)?',          dica: 'Pediu proposta, marcou visita, fez pergunta específica', peso: 1 },
  { id: 'recorrencia', texto: 'Precisam de manutenção recorrente, não serviço pontual?',   dica: 'Contrato mensal é o modelo ideal para estabilidade', peso: 1 },
]

const MAX_SCORE = perguntas.reduce((s, p) => s + p.peso, 0)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreInfo(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.75) return { label: 'ICP Verde — Avance agora', color: 'text-green-700', bg: 'bg-green-50 border-green-200', Icon: CheckCircle }
  if (pct >= 0.50) return { label: 'ICP Amarelo — Avance com cautela', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', Icon: AlertCircle }
  return { label: 'ICP Vermelho — Não é o cliente certo', color: 'text-red-700', bg: 'bg-red-50 border-red-200', Icon: XCircle }
}

function loadLeads(): Lead[] { try { return JSON.parse(localStorage.getItem(ICP_LEADS_KEY) || '[]') } catch { return [] } }
function saveLeads(l: Lead[]) { try { localStorage.setItem(ICP_LEADS_KEY, JSON.stringify(l)) } catch {} }
function loadBuilder(): BuilderRespostas { try { return JSON.parse(localStorage.getItem(ICP_BUILDER_KEY) || '{}') } catch { return {} } }
function saveBuilder(r: BuilderRespostas) { try { localStorage.setItem(ICP_BUILDER_KEY, JSON.stringify(r)) } catch {} }

// ─── ICP Builder ─────────────────────────────────────────────────────────────

function IcpBuilder() {
  const [respostas, setRespostas] = useState<BuilderRespostas>(loadBuilder)
  const [openCard, setOpenCard]   = useState<string | null>(builderQuestions[0].id)

  const answeredCount = builderQuestions.filter(q => (respostas[q.id] || '').trim().length > 20).length
  const pct = Math.round((answeredCount / builderQuestions.length) * 100)

  const update = useCallback((id: string, val: string) => {
    setRespostas(prev => {
      const next = { ...prev, [id]: val }
      saveBuilder(next)
      return next
    })
  }, [])

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-forest-900">{answeredCount} de {builderQuestions.length} perguntas respondidas</p>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pct === 100 ? 'bg-green-100 text-green-700' : pct >= 50 ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-gray-500'}`}>
          {pct === 100 ? 'ICP construído ✓' : `${pct}% completo`}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-forest-500'}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {builderQuestions.map(q => {
          const val = respostas[q.id] || ''
          const filled = val.trim().length > 20
          const isOpen = openCard === q.id

          return (
            <div key={q.id} className={`border rounded-2xl overflow-hidden transition-colors ${filled ? 'border-forest-200 bg-forest-50/30' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => setOpenCard(prev => prev === q.id ? null : q.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${filled ? 'bg-forest-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {filled ? '✓' : q.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-forest-900 truncate">{q.titulo}</p>
                  {!isOpen && val.trim() && (
                    <p className="text-xs text-gray-400 truncate mt-0.5 italic">"{val.trim().substring(0, 80)}{val.trim().length > 80 ? '...' : ''}"</p>
                  )}
                </div>
                {isOpen ? <ChevronUp size={14} className="text-gray-400 shrink-0" /> : <ChevronDown size={14} className="text-gray-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-forest-900 mt-3 mb-1 leading-snug">{q.pergunta}</p>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{q.dica}</p>
                  <textarea
                    value={val}
                    onChange={e => update(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={4}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:border-forest-400 transition-colors placeholder-gray-300 leading-relaxed"
                  />
                  {val.trim().length > 0 && val.trim().length <= 20 && (
                    <p className="text-xs text-amber-500 mt-1">Desenvolva um pouco mais para registrar esta resposta</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {pct === 100 && (
        <div className="mt-6 bg-forest-800 text-white rounded-2xl p-5">
          <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Seu ICP — construído por você</p>
          <p className="text-white/70 text-sm">Você respondeu as 8 perguntas. Use as suas respostas como filtro em toda prospecção: se o prospect não encaixar no que você descreveu, qualifique pelo score antes de avançar.</p>
          <p className="text-white/50 text-xs mt-3">Todas as respostas ficam salvas neste dispositivo. No check-in de 11/06, traga este ICP revisado.</p>
        </div>
      )}
    </div>
  )
}

// ─── Qualifier ────────────────────────────────────────────────────────────────

function IcpQualifier({ onLeadSaved }: { onLeadSaved: () => void }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [notas, setNotas] = useState('')
  const [respostas, setRespostas] = useState<Record<string, boolean | null>>(
    () => Object.fromEntries(perguntas.map(p => [p.id, null]))
  )
  const [done, setDone] = useState(false)

  const allAnswered = Object.values(respostas).every(v => v !== null)
  const score = perguntas.reduce((s, p) => s + (respostas[p.id] ? p.peso : 0), 0)
  const result = done ? scoreInfo(score, MAX_SCORE) : null

  const toggle = (id: string, val: boolean) => {
    setRespostas(prev => ({ ...prev, [id]: prev[id] === val ? null : val }))
    if (done) setDone(false)
  }

  const handleSave = () => {
    if (!nome.trim()) return
    const lead: Lead = {
      id: String(Date.now()), nome: nome.trim(), tipo: tipo.trim(),
      score, max: MAX_SCORE,
      respostas: respostas as Record<string, boolean>,
      notas: notas.trim(),
      criadoEm: new Date().toLocaleDateString('pt-BR'),
    }
    saveLeads([lead, ...loadLeads()])
    onLeadSaved()
    setNome(''); setTipo(''); setNotas('')
    setRespostas(Object.fromEntries(perguntas.map(p => [p.id, null])))
    setDone(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="font-bold text-forest-900 mb-1">Qualificador de Prospect</p>
      <p className="text-gray-500 text-sm mb-5">Avalie um prospect específico contra o seu ICP.</p>

      <input type="text" value={nome} onChange={e => setNome(e.target.value)}
        placeholder="Nome do prospect / empresa"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none focus:border-forest-400 transition-colors" />
      <input type="text" value={tipo} onChange={e => setTipo(e.target.value)}
        placeholder="Segmento (ex: Condomínio, Hotel, Empresa)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-5 focus:outline-none focus:border-forest-400 transition-colors" />

      <div className="space-y-2.5 mb-5">
        {perguntas.map(p => (
          <div key={p.id} className={`border rounded-xl p-3 transition-colors ${respostas[p.id] === true ? 'border-green-200 bg-green-50/50' : respostas[p.id] === false ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
            <p className="text-sm font-semibold text-forest-900 mb-0.5">{p.texto}</p>
            <p className="text-xs text-gray-400 mb-2">{p.dica}</p>
            <div className="flex gap-2">
              <button onClick={() => toggle(p.id, true)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'}`}>
                Sim ✓
              </button>
              <button onClick={() => toggle(p.id, false)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === false ? 'bg-red-400 text-white border-red-400' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'}`}>
                Não ✗
              </button>
            </div>
          </div>
        ))}
      </div>

      <textarea value={notas} onChange={e => setNotas(e.target.value)}
        placeholder="Observações (opcional)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4 resize-none focus:outline-none focus:border-forest-400 transition-colors"
        rows={2} />

      {allAnswered && !done && (
        <button onClick={() => setDone(true)}
          className="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
          Ver resultado →
        </button>
      )}

      {done && result && (
        <div>
          <div className={`border rounded-xl p-4 mb-4 ${result.bg}`}>
            <div className="flex items-center gap-2 mb-1">
              <result.Icon size={18} className={result.color} />
              <p className={`font-bold text-sm ${result.color}`}>{result.label}</p>
            </div>
            <p className={`text-xs opacity-80 ${result.color}`}>Pontuação: {score} de {MAX_SCORE} pontos</p>
          </div>
          {nome.trim() && (
            <button onClick={handleSave}
              className="w-full bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold py-3 rounded-xl text-sm transition-colors">
              Salvar na lista de prospects
            </button>
          )}
        </div>
      )}

      {!allAnswered && (
        <p className="text-xs text-gray-400 text-center">{Object.values(respostas).filter(v => v !== null).length} / {perguntas.length} perguntas respondidas</p>
      )}
    </div>
  )
}

// ─── Lead List ────────────────────────────────────────────────────────────────

function LeadList({ refreshKey }: { refreshKey: number }) {
  const [leads, setLeads] = useState<Lead[]>(loadLeads)
  void refreshKey

  const remove = (id: string) => {
    const next = leads.filter(l => l.id !== id)
    setLeads(next); saveLeads(next)
  }

  // sync when parent signals new lead saved
  useState(() => { setLeads(loadLeads()) })

  if (leads.length === 0) return (
    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
      <Target size={30} className="text-gray-200 mx-auto mb-3" />
      <p className="text-gray-400 text-sm font-medium">Nenhum prospect avaliado ainda</p>
      <p className="text-gray-400 text-xs mt-1">Use o qualificador ao lado para começar</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {leads.map(lead => {
        const r = scoreInfo(lead.score, lead.max)
        return (
          <div key={lead.id} className={`border rounded-2xl p-4 ${r.bg}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <r.Icon size={17} className={`${r.color} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <p className={`font-bold text-sm ${r.color} truncate`}>{lead.nome}</p>
                  {lead.tipo && <p className="text-xs text-gray-500 mt-0.5">{lead.tipo}</p>}
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={9} /> {lead.criadoEm} · Score: {lead.score}/{lead.max}
                  </p>
                  {lead.notas && <p className="text-xs text-gray-600 mt-1.5 italic bg-white/60 px-2 py-1 rounded-lg">"{lead.notas}"</p>}
                </div>
              </div>
              <button onClick={() => remove(lead.id)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function IcpBraun() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <section id="icp" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Clareza de mercado</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">ICP — Perfil do Cliente Ideal</h2>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Construa o seu ICP pelas suas próprias respostas — ninguém conhece melhor seus clientes do que você.
            Depois use o qualificador para avaliar cada novo prospect.
          </p>
        </div>

        {/* ── Bloco 1: Construtor ── */}
        <div className="bg-[#F4F6F0] rounded-2xl p-6 mb-10">
          <div className="mb-6">
            <p className="font-bold text-forest-900 text-lg">Construtor de ICP</p>
            <p className="text-gray-500 text-sm mt-0.5">
              8 perguntas para você sair com clareza total sobre quem é o seu cliente ideal.
              Reserve 15 minutos, responda com honestidade — não existe resposta errada.
            </p>
          </div>
          <IcpBuilder />
        </div>

        {/* ── Reativação alert ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm">Reativação de Leads — Oportunidade de custo zero</p>
            <p className="text-amber-700 text-sm mt-1">
              Liste todos os orçamentos enviados nos últimos 12 meses que não fecharam.{' '}
              <strong>Esses leads já demonstraram interesse</strong> — são os mais fáceis de converter.{' '}
              Script de reativação: <em>"Diego aqui, da Braun Paisagismo. Ainda tenho aquela proposta disponível. Teria espaço para iniciarmos em junho?"</em> — simples, sem pressão.
            </p>
          </div>
        </div>

        {/* ── Bloco 2: Qualificador + Lista ── */}
        <div className="mb-4">
          <p className="font-bold text-forest-900 text-lg">Qualificador de Prospect</p>
          <p className="text-gray-500 text-sm mt-0.5">Com o ICP definido acima, use este score para avaliar cada novo prospect antes de montar a proposta.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <IcpQualifier onLeadSaved={() => setRefreshKey(k => k + 1)} />
          <div>
            <p className="font-bold text-forest-900 mb-1">Prospects Avaliados</p>
            <p className="text-gray-500 text-sm mb-4">Histórico de qualificações — priorize o follow-up pelos verdes</p>
            <LeadList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </section>
  )
}
