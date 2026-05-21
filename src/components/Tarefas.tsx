import { useRef, useState } from 'react'
import { useMemberStorage } from '../hooks/useMemberStorage'
import { Circle, CheckCircle2, AlertTriangle, ExternalLink, Calendar, ChevronDown, ChevronUp, Paperclip, StickyNote, Trash2, FileText, Image, X } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Anexo {
  id: string
  nome: string
  tipo: string
  tamanho: number
  dataUrl: string | null // null = muito grande, só metadado
  addedAt: string
}

interface TarefaState {
  concluida: boolean
  nota: string
  anexos: Anexo[]
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'braun_tarefas_v1'

type AllState = Record<string, TarefaState>
type SetAllState = (v: AllState | ((p: AllState) => AllState)) => void

// ─── Tarefa data ──────────────────────────────────────────────────────────────

const tarefas = [
  {
    id: 'clientes-prejuizo',
    prazo: '22/05 — QUINTA',
    urgencia: 'red',
    titulo: 'Identificar os 5 clientes com maior prejuízo',
    descricao: 'Com base na planilha de análise de clientes, selecionar os 5 que mais drenam margem. Redigir mensagem de desligamento ou reajuste. Estes clientes estão travando seu crescimento.',
    nota: 'Guilherme Perobelli (-38%), Jonatas (-41%) e Cond. Casa e Gramado (-26%) já foram identificados na análise de 20/05.',
    link: { label: 'Ver Planilha de Clientes', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
  },
  {
    id: 'reajuste-carteira',
    prazo: '22/05 — QUINTA',
    urgencia: 'red',
    titulo: 'Reajustar clientes com margem baixa (+25% mínimo)',
    descricao: 'Para os clientes que ficam — não os que serão demitidos — aplicar reajuste de no mínimo 25%. Lembre: a maioria aceita sem reclamar. O medo é seu, não deles.',
    nota: 'Dado crítico do seu diagnóstico: "A maioria aceita sem reclamar" — você mesmo disse isso.',
    link: null,
  },
  {
    id: 'snowland-contato',
    prazo: '25/05 — DOMINGO',
    urgencia: 'orange',
    titulo: 'Primeiro contato com Snowland',
    descricao: 'Ligar ou visitar pessoalmente para retomar o processo. Eles já conhecem seu trabalho — você ligou em 12/05 e disseram que o processo ainda está aberto. Isso é uma retomada, não prospecção fria.',
    nota: 'Piso recomendado: R$ 7.500/mês | Projeção: R$ 8.800/mês (49% de margem) | Deslocamento: ~40km/visita — controlado.',
    link: { label: 'Gerar Proposta Snowland', href: 'https://geradordepropostaselva.lovable.app' },
  },
  {
    id: 'buonavitta-contato',
    prazo: '27/05 — TERÇA',
    urgencia: 'orange',
    titulo: 'Primeiro contato com H. Buona Vitta',
    descricao: 'Marcar visita de diagnóstico. Confirmar localização exata antes de fechar proposta — deslocamento de 57km/visita pode impactar a margem.',
    nota: 'Piso recomendado: R$ 12.000/mês | Projeção: R$ 14.632/mês (49% de margem). Confirmar que fica em rota com outros clientes.',
    link: { label: 'Gerar Proposta H. Buona Vitta', href: 'https://geradordepropostaselva.lovable.app' },
  },
  {
    id: 'campanha-indica',
    prazo: '30/05 — SEXTA',
    urgencia: 'yellow',
    titulo: 'Campanha Indique e Ganhe com os 4 clientes âncora',
    descricao: 'Seus 4 clientes de maior margem têm rede. Uma mensagem personalizada para cada um pedindo indicação pode gerar leads qualificados sem custo de aquisição.',
    nota: 'Clientes âncora: Banrisul (69%), Hortencias Garden (40%), Pedro (38%), Hanna Hotéis (41%). São eles que devem abrir portas para os próximos contratos.',
    link: null,
  },
  {
    id: 'reativacao-leads',
    prazo: '11/06 — CHECK-IN',
    urgencia: 'yellow',
    titulo: 'Mapear leads que já passaram pelo funil + Definir ICP',
    descricao: 'Liste todos os orçamentos enviados nos últimos 12 meses que não fecharam. Quem pediu orçamento e não fechou ainda tem interesse — só precisa de um gatilho. Reativação tem o menor custo de aquisição possível. Use o Qualificador de ICP na seção abaixo para avaliar cada um.',
    nota: 'Script de reativação: "Diego aqui, da Braun Paisagismo. Ainda tenho aquela proposta disponível. Teria espaço para iniciarmos em junho?" — simples, direto, sem pressão.',
    link: null,
  },
]

const urgenciaConfig: Record<string, { bg: string; text: string }> = {
  red: { bg: 'bg-red-100', text: 'text-red-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnexoChip({ anexo, onRemove }: { anexo: Anexo; onRemove: () => void }) {
  const isImage = anexo.tipo.startsWith('image/')
  const isPdf = anexo.tipo === 'application/pdf'
  const kb = (anexo.tamanho / 1024).toFixed(0)

  const handleOpen = () => {
    if (anexo.dataUrl) {
      const win = window.open()
      if (win) {
        if (isImage) {
          win.document.write(`<img src="${anexo.dataUrl}" style="max-width:100%" />`)
        } else {
          const link = win.document.createElement('a')
          link.href = anexo.dataUrl
          link.download = anexo.nome
          link.click()
          win.close()
        }
      }
    }
  }

  return (
    <div className="flex items-center gap-2 bg-forest-50 border border-forest-200 rounded-lg px-3 py-1.5 text-xs">
      {isImage ? <Image size={12} className="text-forest-600 shrink-0" /> : <FileText size={12} className="text-forest-600 shrink-0" />}
      <button onClick={handleOpen} className="text-forest-800 font-medium hover:underline truncate max-w-[140px]">
        {anexo.nome}
      </button>
      <span className="text-gray-400">{kb}KB</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500 ml-1">
        <X size={11} />
      </button>
    </div>
  )
}

function TarefaPanel({ tarefaId, allState, setAllState }: {
  tarefaId: string
  allState: AllState
  setAllState: SetAllState
}) {
  const state: TarefaState = allState[tarefaId] ?? { concluida: false, nota: '', anexos: [] }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState('')

  const update = (patch: Partial<TarefaState>) => {
    setAllState({ ...allState, [tarefaId]: { ...state, ...patch } })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadError('')
    files.forEach(file => {
      const MAX = 3 * 1024 * 1024
      if (file.size > MAX) {
        setUploadError(`"${file.name}" é maior que 3MB. Suba no Google Drive e cole o link nas anotações.`)
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newAnexo: Anexo = {
          id: `${Date.now()}-${Math.random()}`,
          nome: file.name,
          tipo: file.type,
          tamanho: file.size,
          dataUrl: ev.target?.result as string,
          addedAt: new Date().toLocaleString('pt-BR'),
        }
        setAllState(prev => ({
          ...prev,
          [tarefaId]: { ...state, anexos: [...state.anexos, newAnexo] }
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeAnexo = (id: string) => {
    update({ anexos: state.anexos.filter(a => a.id !== id) })
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
      {/* Anotações */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
          <StickyNote size={12} /> Anotações
        </label>
        <textarea
          value={state.nota}
          onChange={e => update({ nota: e.target.value })}
          placeholder="Escreva aqui o andamento, resultados, obstáculos ou qualquer observação..."
          className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-forest-400 focus:bg-white transition-colors"
          rows={3}
        />
        {state.nota && (
          <p className="text-xs text-gray-400 mt-0.5">Salvo automaticamente</p>
        )}
      </div>

      {/* Anexos */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
          <Paperclip size={12} /> Anexos
        </label>
        {state.anexos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {state.anexos.map(a => (
              <AnexoChip key={a.id} anexo={a} onRemove={() => removeAnexo(a.id)} />
            ))}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 border border-dashed border-forest-300 hover:border-forest-500 hover:bg-forest-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Paperclip size={12} /> Anexar arquivo (fotos, PDF, planilha)
        </button>
        {uploadError && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2 flex items-start gap-1.5">
            <AlertTriangle size={11} className="shrink-0 mt-0.5" /> {uploadError}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Máx. 3MB por arquivo. Arquivos maiores: cole o link do Drive nas anotações.</p>
      </div>
    </div>
  )
}

// ─── Main card ────────────────────────────────────────────────────────────────

function TarefaCard({ t, allState, setAllState }: {
  t: typeof tarefas[0]
  allState: AllState
  setAllState: SetAllState
}) {
  const [open, setOpen] = useState(false)
  const state: TarefaState = allState[t.id] ?? { concluida: false, nota: '', anexos: [] }
  const u = urgenciaConfig[t.urgencia]

  const toggleConcluida = () => {
    setAllState({ ...allState, [t.id]: { ...state, concluida: !state.concluida } })
  }

  const hasActivity = state.nota.length > 0 || state.anexos.length > 0

  return (
    <div className={`bg-white border rounded-xl p-5 shadow-sm transition-all ${state.concluida ? 'border-green-200 opacity-75' : 'border-gray-200'}`}>
      <div className="flex gap-4">
        <button onClick={toggleConcluida} className="shrink-0 mt-0.5">
          {state.concluida
            ? <CheckCircle2 size={28} className="text-green-500" />
            : <Circle size={28} className="text-gray-300 hover:text-forest-400 transition-colors" />
          }
        </button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${u.bg} ${u.text}`}>
              {t.prazo}
            </span>
            {hasActivity && (
              <span className="text-xs bg-forest-100 text-forest-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <StickyNote size={10} />
                {state.anexos.length > 0 ? `${state.anexos.length} anexo${state.anexos.length > 1 ? 's' : ''}` : 'com anotação'}
              </span>
            )}
          </div>
          <h3 className={`font-bold text-base mb-1 ${state.concluida ? 'line-through text-gray-400' : 'text-forest-900'}`}>
            {t.titulo}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">{t.descricao}</p>
          <div className="border-l-4 border-gold-500 bg-gold-100 pl-3 py-1.5 rounded-r-lg mb-3">
            <p className="text-xs text-forest-800 font-medium">{t.nota}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
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
            <button
              onClick={() => setOpen(!open)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                open
                  ? 'bg-forest-800 text-white border-forest-800'
                  : 'text-forest-700 border-forest-300 hover:bg-forest-50'
              }`}
            >
              <StickyNote size={12} />
              {open ? 'Fechar' : 'Anotações e Anexos'}
              {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
          {open && <TarefaPanel tarefaId={t.id} allState={allState} setAllState={setAllState} />}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Tarefas() {
  const [allState, setAllState] = useMemberStorage<AllState>(STORAGE_KEY, {})

  const concluidas = tarefas.filter(t => allState[t.id]?.concluida).length

  return (
    <section id="tarefas" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Compromissos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Missão do Momento</h2>
          <p className="text-gray-500 mt-2">Seus compromissos até o check-in de 11/06/2026</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 text-white flex items-start gap-4">
          <AlertTriangle className="text-gold-500 shrink-0 mt-0.5" size={22} />
          <div className="flex-1">
            <p className="font-bold text-lg">Semana decisiva — 22 a 30/05/2026</p>
            <p className="text-white/70 text-sm mt-1">Cinco movimentos que podem mudar definitivamente o seu faturamento. Não adie.</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 bg-forest-700 rounded-full h-2">
                <div
                  className="bg-gold-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(concluidas / tarefas.length) * 100}%` }}
                />
              </div>
              <span className="text-gold-500 text-sm font-bold shrink-0">{concluidas} / {tarefas.length} concluídas</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {tarefas.map(t => <TarefaCard key={t.id} t={t} allState={allState} setAllState={setAllState} />)}
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
