import { useState } from 'react'
import { ExternalLink, FolderOpen, Star, Zap, Edit3, Check, Home, Building, Briefcase, X } from 'lucide-react'

const MIDIAKIT_KEY = 'braun_midiakit_links_v1'

interface MidiaKitLinks {
  residencial: string
  condominios: string
  empresas: string
}

function loadMidiaKit(): MidiaKitLinks {
  try { return { residencial: '', condominios: '', empresas: '', ...JSON.parse(localStorage.getItem(MIDIAKIT_KEY) || '{}') } } catch { return { residencial: '', condominios: '', empresas: '' } }
}
function saveMidiaKit(m: MidiaKitLinks) {
  try { localStorage.setItem(MIDIAKIT_KEY, JSON.stringify(m)) } catch {}
}

function EditableLink({ label, icon: Icon, value, onChange }: { label: string; icon: React.ElementType; value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const hasLink = value.startsWith('http')

  const commit = () => { onChange(draft.trim()); setEditing(false) }

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-3">
      <div className="bg-forest-100 p-2 rounded-lg shrink-0">
        <Icon size={14} className="text-forest-700" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-forest-900">{label}</p>
        {editing ? (
          <div className="flex gap-1.5 items-center mt-1">
            <input
              autoFocus
              type="url"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
              placeholder="https://drive.google.com/..."
              className="flex-1 text-xs bg-gray-50 border border-forest-300 rounded-lg px-2 py-1.5 outline-none focus:border-forest-500 min-w-0"
            />
            <button onClick={commit} className="text-green-600 hover:text-green-700 p-1"><Check size={13} /></button>
            <button onClick={() => { setDraft(value); setEditing(false) }} className="text-gray-400 hover:text-gray-600 p-1"><X size={11} /></button>
          </div>
        ) : (
          <p className="text-xs text-gray-400 truncate mt-0.5">{hasLink ? 'Link salvo ✓' : 'Gere no Selva Propostas → salve no Drive → cole aqui'}</p>
        )}
      </div>
      {!editing && (
        <div className="flex gap-1.5 shrink-0">
          {hasLink && (
            <a href={value} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-2.5 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1 transition-colors">
              Abrir <ExternalLink size={10} />
            </a>
          )}
          <button onClick={() => { setDraft(value); setEditing(true) }}
            className="text-xs border border-gray-200 text-gray-400 hover:border-forest-300 hover:text-forest-600 p-1.5 rounded-lg transition-colors">
            <Edit3 size={11} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function LinksRapidos() {
  const [midiaKit, setMidiaKit] = useState<MidiaKitLinks>(loadMidiaKit)

  const updateMidiaKit = (key: keyof MidiaKitLinks, value: string) => {
    const next = { ...midiaKit, [key]: value }
    setMidiaKit(next)
    saveMidiaKit(next)
  }

  return (
    <section id="links" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Acesso direto</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Links Rápidos</h2>
          <p className="text-gray-500 mt-2">Tudo que você acessa com frequência — em um lugar só</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Drive e Pastas */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <FolderOpen size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Drive Diego</p>
                <p className="text-gray-500 text-xs">Pastas principais da Mentoria</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Pasta Principal Selva Premium', href: 'https://drive.google.com/drive/folders/1WPDnTNh1BGaaNzHOlO9KA2lsQ7PDsDHj' },
                { label: 'Materiais do Diego', href: 'https://drive.google.com/drive/folders/1YjfdgUH5kTSn9vIFcuAbh7RACP5QcRnH' },
                { label: 'Propostas e Portfólios', href: 'https://drive.google.com/drive/folders/1Sj-Pcfvy750gg2-0UC9pEK1ZiK4seEOX' },
                { label: 'Tarefas e Acompanhamento', href: 'https://drive.google.com/drive/folders/1P1xAxtSC7vm0ktTiCmOMFs8Lb3EZU0mr' },
                { label: 'Avaliações Google', href: 'https://drive.google.com/drive/folders/1PtzJX0AXk0dZRbpb1ehonC9mSuqza9P2' },
                { label: 'Lista de Clientes (Planilha)', href: 'https://docs.google.com/spreadsheets/d/1YwSLAciSja6eWzN4llqETchiD2heETWv' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white border border-gray-100 hover:border-forest-300 rounded-xl px-3 py-2.5 group transition-colors"
                >
                  <span className="text-sm text-forest-800 font-medium group-hover:text-forest-600 truncate pr-2 transition-colors">{link.label}</span>
                  <ExternalLink size={12} className="text-gray-300 group-hover:text-forest-500 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Gerador + Mídia Kit */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <Zap size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Gerador Selva</p>
                <p className="text-gray-500 text-xs">Propostas e Mídia Kits por nicho</p>
              </div>
            </div>
            <a
              href="https://geradordepropostaselva.lovable.app"
              target="_blank" rel="noopener noreferrer"
              className="w-full bg-forest-800 hover:bg-forest-700 text-white text-sm font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 mb-5 transition-colors"
            >
              Abrir Gerador de Propostas <ExternalLink size={13} />
            </a>

            <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-1">Mídia Kit por Nicho</p>
            <p className="text-xs text-gray-500 mb-3">Gere → salve PDF no Drive → cole o link aqui para acesso rápido</p>
            <div className="flex flex-col gap-2">
              <EditableLink label="Mídia Kit Residencial" icon={Home} value={midiaKit.residencial} onChange={v => updateMidiaKit('residencial', v)} />
              <EditableLink label="Mídia Kit Condomínios" icon={Building} value={midiaKit.condominios} onChange={v => updateMidiaKit('condominios', v)} />
              <EditableLink label="Mídia Kit Empresas / Hotéis" icon={Briefcase} value={midiaKit.empresas} onChange={v => updateMidiaKit('empresas', v)} />
            </div>
          </div>

          {/* Presença Digital */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <Star size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Presença Digital</p>
                <p className="text-gray-500 text-xs">Canais ativos da Braun Paisagismo</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Instagram @braun_paisagismo', href: 'https://www.instagram.com/braun_paisagismo' },
                { label: 'Google Meu Negócio', href: 'https://www.google.com/maps/search/Braun+Paisagismo+Tr%C3%AAs+Coroas' },
                { label: 'Portfólio Residencial (PDF)', href: 'https://drive.google.com/file/d/1w_4t063chK_XMIWBEymrn9CXr2Hw-ZyA' },
                { label: 'Portfólio Condomínios (PDF)', href: 'https://drive.google.com/file/d/1fvV9-kpTEa2eaW0BqDNYTp1U5dGpTk7p' },
                { label: 'Portfólio Empresas (PDF)', href: 'https://drive.google.com/file/d/1GeisOZ-Je3cgaYoL3BAnvtmrbcCR4iJj' },
                { label: 'Plano de Ação — Mai/2026', href: 'https://docs.google.com/document/d/1zbTY--Cn1R2VCtZMQTEXWHSVkelufUMcX9uofuAP2Co' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white border border-gray-100 hover:border-forest-300 rounded-xl px-3 py-2.5 group transition-colors"
                >
                  <span className="text-sm text-forest-800 font-medium group-hover:text-forest-600 truncate pr-2 transition-colors">{link.label}</span>
                  <ExternalLink size={12} className="text-gray-300 group-hover:text-forest-500 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
