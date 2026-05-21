import { useState } from 'react'
import { MessageSquare, Phone, MapPin, Send, ChevronDown, ChevronUp, Smartphone, Shield, User, Building2, CheckCircle, AlertTriangle, Copy } from 'lucide-react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-forest-600 hover:text-forest-900 font-semibold border border-forest-300 hover:border-forest-600 px-2 py-1 rounded-lg transition-all"
    >
      <Copy size={11} /> {copied ? 'Copiado!' : 'Copiar script'}
    </button>
  )
}

function Script({ label, canal, texto }: { label: string; canal: string; texto: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-forest-700 bg-forest-100 px-2 py-0.5 rounded-full">{canal}</span>
          <span className="text-sm font-semibold text-forest-900">{label}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans mt-3 mb-3">{texto}</pre>
          <CopyButton text={texto} />
        </div>
      )}
    </div>
  )
}

function Etapa({ numero, titulo, descricao, detalhe, prazo }: {
  numero: number; titulo: string; descricao: string; detalhe?: string; prazo?: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-forest-800 text-gold-500 font-bold text-sm flex items-center justify-center shrink-0">{numero}</div>
        <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
      </div>
      <div className="pb-6 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-bold text-forest-900">{titulo}</h4>
          {prazo && <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{prazo}</span>}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{descricao}</p>
        {detalhe && <p className="text-forest-700 text-xs font-medium mt-1.5 bg-forest-50 px-3 py-1.5 rounded-lg border-l-2 border-forest-400">{detalhe}</p>}
      </div>
    </div>
  )
}

const scriptSnowlandWA1 = `Bom dia! Tudo bem?

Aqui é o comercial da Braun Paisagismo. Entramos em contato anteriormente com o responsável pelo espaço e ficamos de retomar com uma proposta atualizada.

Temos portfólio específico em hotéis e empreendimentos turísticos na Serra Gaúcha — trabalhamos com Hanna Hotéis e outros parceiros da região.

Gostaríamos de agendar uma visita rápida ao espaço para apresentar nossa solução de manutenção. Qual seria o melhor dia desta semana?`

const scriptSnowlandFollowUp = `Olá, bom dia!

Passando para retomar o contato sobre a proposta de manutenção de áreas verdes para o Snowland.

Nosso portfólio inclui contratos com hotéis, resorts e empreendimentos de grande porte na região da Serra. Posso encaminhar nosso portfólio corporativo para avaliação prévia?

Fico à disposição para qualquer dúvida.

Equipe Comercial | Braun Paisagismo`

const scriptSnowlandProposta = `Bom dia!

Conforme combinado, segue em anexo nossa proposta de manutenção de áreas verdes para o Snowland.

A proposta contempla:
✅ Cronograma detalhado de visitas
✅ Equipe uniformizada e equipamentos próprios
✅ Relatório fotográfico mensal
✅ Seguro de responsabilidade civil

Estou à disposição para esclarecer qualquer ponto e ajustar conforme as necessidades do espaço.

Equipe Comercial | Braun Paisagismo
📱 (51) 9807-8006`

const scriptBVWA1 = `Bom dia! Tudo bem?

Aqui é o setor comercial da Braun Paisagismo — empresa especializada em paisagismo corporativo premium na Serra Gaúcha.

Passando a conhecer o H. Buona Vitta e gostaríamos de apresentar nossa solução de manutenção de áreas verdes para empreendimentos hoteleiros.

Trabalhamos com hotéis e resorts da região como Hanna Hotéis, e nosso portfólio inclui projetos de grande escala. Poderíamos agendar uma visita para apresentar nosso trabalho?`

const scriptBVVisita = `Bom dia!

Ficamos muito satisfeitos com a visita ao H. Buona Vitta.

Conforme conversado, nossa equipe está preparando uma proposta personalizada levando em conta as especificidades do espaço e o padrão de atendimento que vocês exigem.

Nos próximos 2 dias úteis encaminhamos a proposta completa com cronograma, equipe e valores.

Equipe Comercial | Braun Paisagismo`

const scriptBVFollowUp = `Boa tarde!

Passando para verificar se receberam bem nossa proposta e se há alguma dúvida que possamos esclarecer.

Estamos à disposição para uma reunião rápida — presencial ou por vídeo — para apresentar nosso portfólio completo e alinhar detalhes.

Equipe Comercial | Braun Paisagismo`

export default function AbordagemComercial() {
  return (
    <section id="abordagem" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Estratégia B2B</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Abordagem Comercial</h2>
          <p className="text-gray-500 mt-2">Como chegar nos dois alvos como empresa — não como jardineiro</p>
        </div>

        {/* Conceito central */}
        <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 mb-10 text-white">
          <div className="flex items-start gap-4">
            <Shield size={28} className="text-gold-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-3">O reposicionamento que muda tudo</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Você não é o jardineiro ligando para pedir trabalho. Você é o <span className="text-gold-500 font-bold">setor comercial da Braun Paisagismo</span> entrando em contato para apresentar uma solução corporativa.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3">
                  <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">❌ Como NÃO fazer</p>
                  <p className="text-white/70 text-sm">"Oi, sou o Diego, faço jardinagem aqui na região, queria saber se vocês precisam de um jardineiro..."</p>
                </div>
                <div className="bg-green-500/15 border border-green-400/30 rounded-xl p-3">
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">✅ Como FAZER</p>
                  <p className="text-white/70 text-sm">"Bom dia, aqui é o comercial da Braun Paisagismo. Trabalhamos com hotéis e empreendimentos na Serra e gostaríamos de apresentar nossa solução..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup WhatsApp Comercial */}
        <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-100 p-2 rounded-xl">
              <Smartphone size={22} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-bold text-forest-900 text-lg">Setup do WhatsApp Comercial</h3>
              <p className="text-gray-500 text-sm">Configure antes de fazer qualquer contato</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#F4F6F0] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-700 mb-3">Configuração do número</p>
              <ul className="flex flex-col gap-2">
                {[
                  { icon: Smartphone, text: 'Chip separado — pode ser pré-pago ou segundo número de app (ex: número 2 no celular)' },
                  { icon: User, text: 'Nome de exibição: "Comercial | Braun Paisagismo"' },
                  { icon: Building2, text: 'Foto de perfil: logo da Braun Paisagismo — não foto do Diego' },
                  { icon: MessageSquare, text: 'Conta: WhatsApp Business (gratuito)' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon size={14} className="text-forest-600 shrink-0 mt-0.5" />
                      {item.text}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="bg-[#F4F6F0] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-700 mb-3">Perfil do WhatsApp Business</p>
              <ul className="flex flex-col gap-2 text-sm text-gray-700">
                <li><span className="font-semibold text-forest-800">Nome da empresa:</span> Braun Paisagismo</li>
                <li><span className="font-semibold text-forest-800">Categoria:</span> Serviços de paisagismo</li>
                <li><span className="font-semibold text-forest-800">Descrição:</span> Paisagismo corporativo premium — hotéis, condomínios e empresas na Serra Gaúcha</li>
                <li><span className="font-semibold text-forest-800">Horário:</span> Seg–Sex 8h–18h</li>
                <li><span className="font-semibold text-forest-800">Site:</span> Instagram @braun_paisagismo</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Por que número separado?</strong> Quando o responsável do hotel salvar o contato, vai aparecer "Comercial Braun Paisagismo" — não "Diego". Reforça que há uma estrutura por trás, não um autônomo. Além disso, mantém sua vida pessoal separada da operação comercial.
            </p>
          </div>
        </div>

        {/* Snowland */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-forest-800 to-forest-700 px-7 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500/20 p-2 rounded-lg">
                <MapPin size={20} className="text-gold-500" />
              </div>
              <div>
                <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 1 — Retomada</span>
                <h3 className="text-white font-bold text-xl">Snowland</h3>
              </div>
              <span className="ml-auto bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">PROCESSO ABERTO</span>
            </div>
          </div>
          <div className="p-7">
            <p className="text-gray-600 text-sm mb-6 bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
              <strong className="text-blue-800">Contexto crítico:</strong> Diego ligou em 12/05. A pessoa disse que o processo ainda está aberto e que podem receber uma proposta atualizada. <strong>Isso é uma retomada com porta aberta — não cold call.</strong> Mencionar esse histórico no primeiro contato.
            </p>

            <h4 className="font-bold text-forest-900 mb-5 flex items-center gap-2">
              <CheckCircle size={16} className="text-forest-600" /> Etapas da Abordagem
            </h4>

            <div className="mb-6">
              <Etapa numero={1} titulo="WhatsApp de retomada" prazo="Até 25/05" descricao="Primeiro contato pelo WhatsApp comercial. Âncora no histórico anterior. Objetivo: confirmar quem é o responsável e agendar visita diagnóstica." />
              <Etapa numero={2} titulo="Follow-up se silêncio em 48h" prazo="48h depois" descricao="Se não houver resposta, enviar mensagem de follow-up curta e direta. Não perguntar se viram — assumir que sim e avançar." />
              <Etapa numero={3} titulo="Ligação direta" prazo="Se necessário" descricao="Ligar para o número principal do Snowland pedindo para falar com o responsável pelo espaço externo / manutenção. Mencionar que o contato anterior indicou que havia interesse." detalhe="Tom: 'Bom dia, sou do comercial da Braun Paisagismo, entramos em contato há algumas semanas sobre a manutenção das áreas verdes do parque. Posso falar com o responsável?'" />
              <Etapa numero={4} titulo="Visita diagnóstica" prazo="Na semana" descricao="Visita presencial sem proposta de preço. Objetivo: conhecer o espaço, entender a situação atual, identificar dores. Levar portfólio impresso ou tablet com cases de hotéis." detalhe="Perguntas SPIN: Como está a manutenção atual? Qual é a frequência? Já tiveram problemas com jardinagem inadequada afetando a experiência do hóspede?" />
              <Etapa numero={5} titulo="Envio da proposta" prazo="Em até 24h após visita" descricao="Usar o Gerador de Propostas Selva. Enviar pelo WhatsApp comercial com mensagem personalizada referenciando o que foi visto na visita." />
              <Etapa numero={6} titulo="Follow-up pós-proposta" prazo="48–72h depois" descricao="Se não houver resposta, fazer follow-up curto. Oferecer ajuste na proposta ou reunião para esclarecimentos. Máximo 2 follow-ups — depois disso, aguardar." />
            </div>

            <h4 className="font-bold text-forest-900 mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-forest-600" /> Scripts Prontos
            </h4>
            <div className="flex flex-col gap-3">
              <Script label="Primeiro contato — retomada" canal="WhatsApp" texto={scriptSnowlandWA1} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptSnowlandFollowUp} />
              <Script label="Envio da proposta" canal="WhatsApp" texto={scriptSnowlandProposta} />
            </div>
          </div>
        </div>

        {/* H. Buona Vitta */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-forest-700 to-forest-600 px-7 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500/20 p-2 rounded-lg">
                <Building2 size={20} className="text-gold-500" />
              </div>
              <div>
                <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 2 — Novo contato</span>
                <h3 className="text-white font-bold text-xl">H. Buona Vitta</h3>
              </div>
              <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">ALTA OPORTUNIDADE</span>
            </div>
          </div>
          <div className="p-7">
            <p className="text-gray-600 text-sm mb-6 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <strong className="text-amber-800">Atenção antes de abordar:</strong> Confirmar localização exata do H. Buona Vitta para calcular deslocamento real antes de fechar qualquer proposta. Com 57km/visita (4 visitas = 228km/mês) o custo de deslocamento impacta a margem — confirmar rota com outros clientes.
            </p>

            <h4 className="font-bold text-forest-900 mb-5 flex items-center gap-2">
              <CheckCircle size={16} className="text-forest-600" /> Etapas da Abordagem
            </h4>

            <div className="mb-6">
              <Etapa numero={1} titulo="Pesquisa antes do contato" prazo="30 min antes" descricao="Pesquisar o H. Buona Vitta no Google, Instagram e Google Maps. Identificar como são as áreas verdes, se há fotos, quem é o responsável (gerente geral / gerente de manutenção). Confirmar localização exata." detalhe="Buscar: 'H Buona Vitta hotel Serra Gaúcha contato gerente' + analisar fotos das áreas externas no Google Maps / Instagram." />
              <Etapa numero={2} titulo="Primeiro contato — WhatsApp comercial" prazo="Até 27/05" descricao="Mensagem pelo WhatsApp comercial da Braun Paisagismo. Tom: empresa apresentando solução, não autônomo pedindo trabalho. Mencionar cases de hotéis da região como âncora de credibilidade." />
              <Etapa numero={3} titulo="Follow-up e agendamento da visita" prazo="48h depois" descricao="Se não responder no WhatsApp, tentar pelo telefone principal do hotel. Pedir para falar com a gerência ou responsável pela manutenção do espaço." detalhe="'Bom dia, aqui é do comercial da Braun Paisagismo. Enviamos uma mensagem anteriormente sobre nossa solução de paisagismo para o hotel. Poderia falar com o responsável pelo espaço externo?'" />
              <Etapa numero={4} titulo="Visita diagnóstica" prazo="Agendar na mesma semana" descricao="Visita ao espaço sem falar de preço. Levar portfólio de hotéis (Hanna Hotéis como referência principal). Fazer perguntas SPIN para entender as dores antes de apresentar qualquer solução." detalhe="Durante a visita: confirmar exatamente onde fica, medir mentalmente o espaço, entender frequência necessária, identificar quem decide a contratação." />
              <Etapa numero={5} titulo="Proposta personalizada" prazo="24h após visita" descricao="Gerar proposta pelo Gerador Selva com base no que foi visto. Incluir portfólio de hotéis como case de referência. Enviar pelo WhatsApp comercial com mensagem referenciando a visita." />
              <Etapa numero={6} titulo="Follow-up pós-proposta" prazo="48–72h depois" descricao="Mensagem curta perguntando se há dúvidas. Oferecer ajuste ou reunião. Se tiver outro contato de referência na Serra (ex: Hanna Hotéis), mencionar como referência disponível." />
            </div>

            <h4 className="font-bold text-forest-900 mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-forest-600" /> Scripts Prontos
            </h4>
            <div className="flex flex-col gap-3">
              <Script label="Primeiro contato" canal="WhatsApp" texto={scriptBVWA1} />
              <Script label="Pós-visita diagnóstica" canal="WhatsApp" texto={scriptBVVisita} />
              <Script label="Follow-up pós-proposta" canal="WhatsApp" texto={scriptBVFollowUp} />
            </div>

            <div className="mt-6 bg-forest-50 border border-forest-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-forest-900 font-semibold text-sm mb-1">Script de ligação — recepção do hotel</p>
                  <p className="text-gray-600 text-sm italic">
                    "Bom dia! Aqui é [seu nome], do setor comercial da Braun Paisagismo. Somos especializados em manutenção de áreas verdes para hotéis e empreendimentos na Serra Gaúcha. Trabalho com alguns parceiros hoteleiros da região e gostaria de apresentar nossa solução para o H. Buona Vitta. Você poderia me passar o contato de quem cuida da manutenção ou do gerente responsável pelo espaço externo?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Princípios gerais */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: 'Sempre "nós", nunca "eu"', desc: 'Use "nossa equipe", "nosso portfólio", "trabalhamos com". Posiciona empresa, não pessoa.' },
            { icon: Send, title: 'Âncora de credibilidade', desc: 'Mencione Hanna Hotéis ou Banrisul sempre que possível. Clientes do mesmo segmento abrem portas.' },
            { icon: CheckCircle, title: 'Máximo 2 follow-ups', desc: 'Após 2 tentativas sem resposta, arquivar e retomar em 30 dias. Insistência excessiva queima o lead.' },
          ].map((p, i) => {
            const Icon = p.icon
            return (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 flex gap-3">
                <Icon size={18} className="text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-forest-900 text-sm mb-1">{p.title}</p>
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
