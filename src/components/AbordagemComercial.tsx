import { useState } from 'react'
import { MessageSquare, Phone, MapPin, Send, ChevronDown, ChevronUp, Smartphone, Shield, User, Building2, CheckCircle, AlertTriangle, Copy, Check } from 'lucide-react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea'); el.value = text
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    })
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handle}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${copied ? 'bg-green-500 text-white border-green-500' : 'border-forest-300 text-forest-600 hover:border-forest-600 hover:text-forest-900'}`}>
      {copied ? <><Check size={11} /> Copiado</> : <><Copy size={11} /> Copiar script</>}
    </button>
  )
}

function Script({ label, canal, texto }: { label: string; canal: string; texto: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50/80 transition-colors text-left">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-forest-700 bg-forest-100 px-2 py-0.5 rounded-full">{canal}</span>
          <span className="text-sm font-semibold text-forest-900">{label}</span>
        </div>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-gray-50/50 border-t border-gray-100">
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans mt-3 mb-3">{texto}</pre>
          <CopyButton text={texto} />
        </div>
      )}
    </div>
  )
}

function EtapasList({ etapas }: { etapas: { titulo: string; prazo?: string; desc: string; detalhe?: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-6">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900 transition-colors mb-3">
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? 'Ocultar' : 'Ver'} {etapas.length} etapas da abordagem
      </button>
      {open && (
        <div className="flex flex-col gap-0">
          {etapas.map((e, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-forest-800 text-gold-500 font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</div>
                {i < etapas.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 mt-1.5" />}
              </div>
              <div className="pb-5 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-bold text-forest-900 text-sm">{e.titulo}</p>
                  {e.prazo && <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{e.prazo}</span>}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{e.desc}</p>
                {e.detalhe && <p className="text-forest-700 text-xs font-medium mt-1.5 bg-forest-50 px-3 py-1.5 rounded-xl border-l-2 border-forest-400">{e.detalhe}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const etapasSnowland = [
  { titulo: 'WhatsApp de retomada', prazo: 'Até 25/05', desc: 'Primeiro contato pelo WA comercial. Âncorar no histórico anterior. Objetivo: confirmar responsável e agendar visita diagnóstica.' },
  { titulo: 'Follow-up se silêncio em 48h', prazo: '48h depois', desc: 'Mensagem curta e direta. Não perguntar se viram — assumir que sim e avançar.' },
  { titulo: 'Ligação direta', prazo: 'Se necessário', desc: 'Ligar para o número principal pedindo para falar com o responsável pelo espaço externo.', detalhe: '"Bom dia, sou do comercial da Braun Paisagismo, entramos em contato sobre a manutenção das áreas verdes. Posso falar com o responsável?"' },
  { titulo: 'Visita diagnóstica', prazo: 'Na semana', desc: 'Visita sem proposta de preço. Levar portfólio. Perguntas SPIN: frequência atual, histórico de problemas, impacto na experiência do hóspede.' },
  { titulo: 'Envio da proposta', prazo: '24h após visita', desc: 'Usar o Gerador Selva. Enviar pelo WA comercial com mensagem referenciando o que foi visto.' },
  { titulo: 'Follow-up pós-proposta', prazo: '48–72h depois', desc: 'Máximo 2 follow-ups. Oferecer ajuste ou reunião. Depois disso, aguardar.' },
]

const etapasBV = [
  { titulo: 'Pesquisa prévia', prazo: '30 min antes', desc: 'Google, Instagram, Google Maps. Confirmar localização exata, ver fotos das áreas verdes, identificar gerente responsável.' },
  { titulo: 'Primeiro contato WA', prazo: 'Até 27/05', desc: 'Tom: empresa apresentando solução. Mencionar cases de hotéis da região como âncora de credibilidade.' },
  { titulo: 'Follow-up e agendamento', prazo: '48h depois', desc: 'Se não responder no WA, tentar pelo telefone principal.', detalhe: '"Bom dia, aqui é do comercial da Braun Paisagismo. Enviamos uma mensagem anteriormente. Poderia falar com o responsável pelo espaço externo?"' },
  { titulo: 'Visita diagnóstica', prazo: 'Na mesma semana', desc: 'Sem falar de preço. Portfólio de hotéis. SPIN para entender dores. Confirmar localização e frequência necessária.' },
  { titulo: 'Proposta personalizada', prazo: '24h após visita', desc: 'Gerador Selva com base no que foi visto. Incluir portfólio de hotéis. Enviar pelo WA comercial.' },
  { titulo: 'Follow-up pós-proposta', prazo: '48–72h depois', desc: 'Mensagem curta. Máximo 2 follow-ups. Oferecer Hanna Hotéis como referência disponível.' },
]

const scriptSnowlandWA1 = `Bom dia! Tudo bem?

Aqui é o comercial da Braun Paisagismo. Entramos em contato anteriormente com o responsável pelo espaço e ficamos de retomar com uma proposta atualizada.

Temos portfólio específico em hotéis e empreendimentos turísticos na Serra Gaúcha — trabalhamos com Hanna Hotéis e outros parceiros da região.

Gostaríamos de agendar uma visita rápida ao espaço para apresentar nossa solução de manutenção. Qual seria o melhor dia desta semana?`

const scriptSnowlandFollowUp = `Olá, bom dia!

Passando para retomar o contato sobre a proposta de manutenção de áreas verdes para o Snowland.

Nosso portfólio inclui contratos com hotéis e empreendimentos de grande porte na Serra. Posso encaminhar nosso portfólio corporativo para avaliação prévia?

Equipe Comercial | Braun Paisagismo`

const scriptSnowlandProposta = `Bom dia!

Conforme combinado, segue em anexo nossa proposta de manutenção de áreas verdes para o Snowland.

A proposta contempla:
✅ Cronograma detalhado de visitas
✅ Equipe uniformizada e equipamentos próprios
✅ Relatório fotográfico mensal
✅ Seguro de responsabilidade civil

Estou à disposição para esclarecer qualquer ponto.

Equipe Comercial | Braun Paisagismo
📱 (51) 9807-8006`

const scriptBVWA1 = `Bom dia! Tudo bem?

Aqui é o setor comercial da Braun Paisagismo — empresa especializada em paisagismo corporativo premium na Serra Gaúcha.

Passando a conhecer o H. Buona Vitta e gostaríamos de apresentar nossa solução de manutenção de áreas verdes para empreendimentos hoteleiros.

Trabalhamos com hotéis e resorts da região como Hanna Hotéis. Poderíamos agendar uma visita para apresentar nosso trabalho?`

const scriptBVVisita = `Bom dia!

Ficamos muito satisfeitos com a visita ao H. Buona Vitta.

Nossa equipe está preparando uma proposta personalizada levando em conta as especificidades do espaço e o padrão de atendimento que vocês exigem.

Nos próximos 2 dias úteis encaminhamos a proposta completa.

Equipe Comercial | Braun Paisagismo`

const scriptBVFollowUp = `Boa tarde!

Passando para verificar se receberam bem nossa proposta e se há alguma dúvida.

Estamos à disposição para uma reunião rápida — presencial ou por vídeo.

Equipe Comercial | Braun Paisagismo`

export default function AbordagemComercial() {
  return (
    <section id="abordagem" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Estratégia B2B</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Abordagem Comercial</h2>
        </div>

        {/* Conceito central */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-start gap-4">
            <Shield size={22} className="text-gold-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-2">Você é o setor comercial da Braun Paisagismo</h3>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3">
                  <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">Não fazer</p>
                  <p className="text-white/70 text-sm">"Oi, sou o Diego, faço jardinagem aqui na região, queria saber se precisam de um jardineiro..."</p>
                </div>
                <div className="bg-green-500/15 border border-green-400/30 rounded-xl p-3">
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">Fazer</p>
                  <p className="text-white/70 text-sm">"Bom dia, aqui é o comercial da Braun Paisagismo. Trabalhamos com hotéis na Serra e gostaríamos de apresentar nossa solução..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup WhatsApp */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-xl shrink-0">
              <Smartphone size={18} className="text-green-700" />
            </div>
            <div>
              <p className="font-bold text-forest-900">Setup do WhatsApp Comercial</p>
              <p className="text-gray-500 text-xs">Configure antes de qualquer contato</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#F4F6F0] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-700 mb-2">Configuração do número</p>
              <ul className="flex flex-col gap-1.5">
                {[
                  { icon: Smartphone, text: 'Chip separado ou segundo número de app' },
                  { icon: User,       text: 'Nome: "Comercial | Braun Paisagismo"' },
                  { icon: Building2,  text: 'Foto: logo da Braun (não foto do Diego)' },
                  { icon: MessageSquare, text: 'Conta: WhatsApp Business (gratuito)' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon size={13} className="text-forest-600 shrink-0 mt-0.5" /> {item.text}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Por quê?</strong> Quando o gerente salvar o contato, aparece "Comercial Braun Paisagismo" — reforça que há estrutura por trás, não um autônomo.
              </p>
            </div>
          </div>
        </div>

        {/* Snowland */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-forest-800 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <MapPin size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 1 — Retomada</p>
              <p className="text-white font-bold text-lg leading-tight">Snowland</p>
            </div>
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">PROCESSO ABERTO</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-blue-50 border-l-3 border-blue-400 px-4 py-3 rounded-r-xl border-l-4">
              <strong className="text-blue-800">Contexto:</strong> Diego ligou em 12/05. Processo ainda aberto, podem receber proposta atualizada. <strong>Mencione esse histórico no primeiro contato.</strong>
            </p>
            <EtapasList etapas={etapasSnowland} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — retomada" canal="WhatsApp" texto={scriptSnowlandWA1} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptSnowlandFollowUp} />
              <Script label="Envio da proposta" canal="WhatsApp" texto={scriptSnowlandProposta} />
            </div>
          </div>
        </div>

        {/* H. Buona Vitta */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-forest-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <Building2 size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 2 — Novo contato</p>
              <p className="text-white font-bold text-lg leading-tight">H. Buona Vitta</p>
            </div>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">ALTA OPORTUNIDADE</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <strong className="text-amber-800">Atenção:</strong> Confirmar localização antes de fechar. Com 57km/visita (4 visitas = 228km/mês), roteirizar com outros clientes para reduzir custo real.
            </p>
            <EtapasList etapas={etapasBV} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato" canal="WhatsApp" texto={scriptBVWA1} />
              <Script label="Pós-visita diagnóstica" canal="WhatsApp" texto={scriptBVVisita} />
              <Script label="Follow-up pós-proposta" canal="WhatsApp" texto={scriptBVFollowUp} />
            </div>
            <div className="mt-4 bg-forest-50 border border-forest-100 rounded-2xl p-4 flex items-start gap-2">
              <Phone size={14} className="text-forest-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-forest-900 font-semibold text-sm mb-1">Script de ligação — recepção do hotel</p>
                <p className="text-gray-600 text-sm italic">
                  "Bom dia! Aqui é [seu nome], do setor comercial da Braun Paisagismo. Trabalhamos com hotéis na Serra Gaúcha e gostaria de falar com o responsável pelo espaço externo ou com a gerência. Poderia me passar o contato?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Princípios */}
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { icon: Shield,       title: 'Sempre "nós", nunca "eu"',    desc: '"Nossa equipe", "nosso portfólio", "trabalhamos com" — posiciona empresa.' },
            { icon: Send,         title: 'Âncora de credibilidade',     desc: 'Mencione Hanna Hotéis ou Banrisul sempre. Clientes do mesmo segmento abrem portas.' },
            { icon: CheckCircle,  title: 'Máximo 2 follow-ups',         desc: 'Após 2 tentativas sem resposta, arquivar e retomar em 30 dias.' },
          ].map((p, i) => {
            const Icon = p.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-3">
                <Icon size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-forest-900 text-sm mb-0.5">{p.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
