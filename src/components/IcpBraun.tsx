import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Target, Trash2, Clock } from 'lucide-react'

const ICP_LEADS_KEY = 'braun_icp_leads_v1'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pergunta {
  id: string
  texto: string
  dica: string
  peso: number
}

interface Lead {
  id: string
  nome: string
  tipo: string
  score: number
  max: number
  respostas: Record<string, boolean>
  notas: string
  criadoEm: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const perguntas: Pergunta[] = [
  { id: 'tipo',        texto: 'É uma empresa, hotel, condomínio ou estabelecimento comercial?', dica: 'Não residencial pequeno — B2B é o foco', peso: 2 },
  { id: 'area',        texto: 'A área verde é importante para a imagem do negócio?',            dica: 'Hotéis, spas, condos premium, lojas de moda', peso: 2 },
  { id: 'localizacao', texto: 'Fica dentro do raio de 50km em rota viável?',                   dica: 'Calcule: deslocamento não pode comer a margem', peso: 2 },
  { id: 'ticket',      texto: 'Ticket estimado acima de R$ 2.000/mês?',                        dica: 'Contratos menores não cobrem fixo + deslocamento', peso: 2 },
  { id: 'decisor',     texto: 'Você fala diretamente com quem aprova o contrato?',              dica: 'Intermediário = proposta some sem resposta', peso: 1 },
  { id: 'historico',   texto: 'Eles já tiveram serviço de paisagismo antes?',                  dica: 'Já educados para pagar — negociação mais fácil', peso: 1 },
  { id: 'interesse',   texto: 'Demonstraram interesse real (não só curiosidade)?',              dica: 'Pediu proposta, marcou visita, fez pergunta específica', peso: 1 },
  { id: 'recorrencia', texto: 'Precisam de manutenção recorrente (não serviço pontual)?',       dica: 'Contrato mensal é o modelo ideal para estabilidade', peso: 1 },
]

const MAX_SCORE = perguntas.reduce((s, p) => s + p.peso, 0) // 12

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreInfo(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.75) return { label: 'ICP Verde — Avance agora', color: 'text-green-700', bg: 'bg-green-50 border-green-200', dot: 'bg-green-500', Icon: CheckCircle }
  if (pct >= 0.50) return { label: 'ICP Amarelo — Avance com cautela', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400', Icon: AlertCircle }
  return { label: 'ICP Vermelho — Não é o cliente certo', color: 'text-red-700', bg: 'bg-red-50 border-red-200', dot: 'bg-red-400', Icon: XCircle }
}

function loadLeads(): Lead[] {
  try { return JSON.parse(localStorage.getItem(ICP_LEADS_KEY) || '[]') } catch { return [] }
}
function saveLeads(l: Lead[]) {
  try { localStorage.setItem(ICP_LEADS_KEY, JSON.stringify(l)) } catch {}
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
      id: String(Date.now()),
      nome: nome.trim(),
      tipo: tipo.trim(),
      score,
      max: MAX_SCORE,
      respostas: respostas as Record<string, boolean>,
      notas: notas.trim(),
      criadoEm: new Date().toLocaleDateString('pt-BR'),
    }
    const prev = loadLeads()
    saveLeads([lead, ...prev])
    onLeadSaved()
    setNome(''); setTipo(''); setNotas('')
    setRespostas(Object.fromEntries(perguntas.map(p => [p.id, null])))
    setDone(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="font-bold text-forest-900 mb-1">Qualificador de Prospect</p>
      <p className="text-gray-500 text-sm mb-5">Preencha as perguntas sobre o prospect e descubra se vale avançar.</p>

      <input
        type="text"
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nome do prospect / empresa"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none focus:border-forest-400 transition-colors"
      />
      <input
        type="text"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        placeholder="Segmento (ex: Condomínio, Hotel, Empresa)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-5 focus:outline-none focus:border-forest-400 transition-colors"
      />

      <div className="space-y-2.5 mb-5">
        {perguntas.map(p => (
          <div key={p.id} className={`border rounded-xl p-3 transition-colors ${respostas[p.id] === true ? 'border-green-200 bg-green-50/50' : respostas[p.id] === false ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
            <p className="text-sm font-semibold text-forest-900 mb-0.5">{p.texto}</p>
            <p className="text-xs text-gray-400 mb-2">{p.dica}</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggle(p.id, true)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'}`}
              >
                Sim ✓
              </button>
              <button
                onClick={() => toggle(p.id, false)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === false ? 'bg-red-400 text-white border-red-400' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'}`}
              >
                Não ✗
              </button>
            </div>
          </div>
        ))}
      </div>

      <textarea
        value={notas}
        onChange={e => setNotas(e.target.value)}
        placeholder="Observações (opcional)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4 resize-none focus:outline-none focus:border-forest-400 transition-colors"
        rows={2}
      />

      {allAnswered && !done && (
        <button
          onClick={() => setDone(true)}
          className="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
        >
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
            <button
              onClick={handleSave}
              className="w-full bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold py-3 rounded-xl text-sm transition-colors"
            >
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

// ─── Lead list ────────────────────────────────────────────────────────────────

function LeadList({ refreshKey }: { refreshKey: number }) {
  const [leads, setLeads] = useState<Lead[]>(() => loadLeads())

  // re-read from localStorage when refreshKey changes (new lead saved)
  const handleRefresh = () => setLeads(loadLeads())
  if (refreshKey) void 0 // trick to use refreshKey dep — real effect below

  const removeLeadItem = (id: string) => {
    const next = leads.filter(l => l.id !== id)
    setLeads(next)
    saveLeads(next)
  }

  // Sync when parent notifies
  useState(() => { setLeads(loadLeads()) })

  if (leads.length === 0) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
        <Target size={30} className="text-gray-200 mx-auto mb-3" />
        <p className="text-gray-400 text-sm font-medium">Nenhum prospect avaliado ainda</p>
        <p className="text-gray-400 text-xs mt-1">Use o qualificador ao lado para começar</p>
      </div>
    )
  }

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
                    <Clock size={9} />
                    {lead.criadoEm} · Score: {lead.score}/{lead.max}
                  </p>
                  {lead.notas && (
                    <p className="text-xs text-gray-600 mt-1.5 italic bg-white/60 px-2 py-1 rounded-lg">"{lead.notas}"</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeLeadItem(lead.id)}
                className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-0.5"
              >
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
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Qualificação de Clientes</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">ICP — Perfil do Cliente Ideal</h2>
          <p className="text-gray-500 mt-2">Parar de perder tempo com clientes errados é tão importante quanto fechar novos contratos</p>
        </div>

        {/* ICP Definition */}
        <div className="grid lg:grid-cols-2 gap-5 mb-10">
          <div className="bg-forest-800 rounded-2xl p-6 text-white">
            <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-4">Perfil do Cliente Ideal — Braun Paisagismo</p>
            <div className="space-y-3">
              {[
                { label: 'Tipo',         value: 'Empresa, hotel, condomínio ou estabelecimento comercial' },
                { label: 'Área verde',   value: 'Visível e estratégica para a imagem do negócio' },
                { label: 'Localização',  value: 'Até 50km de Três Coroas, em rota com outros clientes' },
                { label: 'Ticket mín.',  value: 'R$ 2.000/mês — contratos mensais, nunca pontual' },
                { label: 'Decisor',      value: 'Acesso direto ao aprovador (gerente, síndico, proprietário)' },
                { label: 'Maturidade',   value: 'Já usou paisagismo — entende e valoriza o serviço' },
              ].map(item => (
                <div key={item.label} className="flex gap-3 items-start">
                  <span className="text-gold-500 font-bold text-xs shrink-0 w-20 pt-0.5">{item.label}</span>
                  <span className="text-white/75 text-sm leading-relaxed">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <p className="text-red-700 text-xs font-bold uppercase tracking-widest mb-4">Red Flags — Não Vale a Energia</p>
            <div className="space-y-2.5">
              {[
                'Residencial pequeno sem recorrência',
                'Localização > 60km sem rota estratégica',
                'Quer só uma limpeza pontual, não contrato',
                'Preço é o único critério de decisão',
                'Intermediário que nunca aprova nada',
                'Jardim não é prioridade para a empresa',
              ].map((flag, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-700">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reativação alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm">Reativação de Leads — Oportunidade de custo zero</p>
            <p className="text-amber-700 text-sm mt-1">
              Liste todos os orçamentos enviados nos últimos 12 meses que não fecharam. <strong>Esses leads já demonstraram interesse</strong> — são os mais fáceis de converter.{' '}
              Script de reativação: <em>"Diego aqui, da Braun Paisagismo. Ainda tenho aquela proposta disponível. Teria espaço para iniciarmos em junho?"</em> — simples, sem pressão.
            </p>
          </div>
        </div>

        {/* Qualifier + Lead List */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <IcpQualifier onLeadSaved={() => setRefreshKey(k => k + 1)} />
          <div>
            <p className="font-bold text-forest-900 mb-1">Prospects Avaliados</p>
            <p className="text-gray-500 text-sm mb-4">Histórico de qualificações — use para priorizar o follow-up</p>
            <LeadList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </section>
  )
}
