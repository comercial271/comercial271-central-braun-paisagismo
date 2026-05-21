import { useState } from 'react'
import { Clapperboard, Camera, BookOpen, Building2, Mic, CheckCircle, Circle, Flame, AlertCircle, TrendingUp } from 'lucide-react'

const IG_IDEAS_KEY = 'braun_ig_ideas_v1'

// ─── Data ─────────────────────────────────────────────────────────────────────

const pilares = [
  {
    id: 'transformacao',
    nome: 'Transformação',
    Icon: Clapperboard,
    bg: 'bg-forest-700',
    freq: '1-2x/semana',
    desc: 'Antes/depois com contexto. Não só a foto — conta o problema do cliente, o desafio, e o que foi feito.',
    gancho: '"O jardim do [cliente] estava [situação]. O que a Braun fez em [X dias]:"',
    formato: 'Reel ou Carrossel',
  },
  {
    id: 'bastidores',
    nome: 'Bastidores',
    Icon: Camera,
    bg: 'bg-teal-600',
    freq: '2-3x/semana (Stories)',
    desc: 'Diego + equipe em ação. Chegada, processo, detalhes que mostram cuidado. Humaniza a marca.',
    gancho: '"Uma manhã de trabalho na Serra Gaúcha (6h30, POV)" ou "Assim anda minha equipe:"',
    formato: 'Stories + Reels curtos',
  },
  {
    id: 'educacao',
    nome: 'Educação',
    Icon: BookOpen,
    bg: 'bg-blue-700',
    freq: '1x/semana',
    desc: 'Você ensina → você posiciona. O que separa paisagismo profissional de amador.',
    gancho: '"3 erros que jardins corporativos cometem (e que custam caro)" ou "Quando trocar o paisagismo da sua empresa:"',
    formato: 'Carrossel ou Reel',
  },
  {
    id: 'b2b',
    nome: 'Posicionamento B2B',
    Icon: Building2,
    bg: 'bg-amber-700',
    freq: '1x/semana',
    desc: 'Fala diretamente com hotéis, condomínios e empresas. Jardim como investimento, não como custo.',
    gancho: '"O jardim do seu hotel é a primeira impressão do hóspede. O que ele está dizendo sobre você?"',
    formato: 'Carrossel ou Reel',
  },
  {
    id: 'fundador',
    nome: 'Fundador',
    Icon: Mic,
    bg: 'bg-purple-700',
    freq: '1-2x/semana',
    desc: 'Diego falando diretamente. Sua história, sua visão, suas opiniões. Você cria confiança — não a empresa.',
    gancho: '"Saí de fábrica de calçados. Hoje tenho contratos com hotéis 4 estrelas. Como aconteceu:"',
    formato: 'Reel (câmera na cara)',
  },
]

const ideias = [
  { id: '01', pilar: 'transformacao', formato: 'Reel',      hook: 'O jardim do Cond. [X] estava sem manutenção há meses. O que a Braun fez em 2 semanas:',                         visual: 'Gravação chegando no canteiro + corte rápido do trabalho + resultado final com zoom nos detalhes' },
  { id: '02', pilar: 'transformacao', formato: 'Carrossel', hook: 'Antes e depois: a transformação que o Banrisul Três Coroas nos pediu',                                             visual: 'Fotos antes vs depois lado a lado, último slide = equipe na frente da agência' },
  { id: '03', pilar: 'transformacao', formato: 'Reel',      hook: 'Hortencias Garden queria um jardim que refletisse o nível do espaço. Entregamos:',                                 visual: 'Tour do espaço antes, zoom nos problemas, corte para o depois com música ambiente' },
  { id: '04', pilar: 'bastidores',    formato: 'Reel',      hook: 'Como começa um dia de trabalho na Braun Paisagismo — Serra Gaúcha, 6h30',                                          visual: 'POV: entrando na van, arrumando equipamentos, estrada da Serra, chegando no primeiro cliente' },
  { id: '05', pilar: 'bastidores',    formato: 'Stories',   hook: 'Minha equipe anda assim — uniforme, logo, nome. Por um motivo.',                                                   visual: 'Foto equipe uniformizada no cliente, close no bordado da camisa, slide com texto explicando o porquê' },
  { id: '06', pilar: 'bastidores',    formato: 'Reel',      hook: 'Manutenção dos equipamentos antes de ir a campo — o que a maioria das empresas não faz',                           visual: 'Mostrando revisão de cada equipamento, Diego explica o que acontece se não fizer isso' },
  { id: '07', pilar: 'bastidores',    formato: 'Stories',   hook: 'Visita de diagnóstico: o que eu analiso antes de fechar qualquer contrato',                                        visual: 'Diego mostrando o que observa, explica o processo profissional de avaliação em 3-4 slides' },
  { id: '08', pilar: 'educacao',      formato: 'Carrossel', hook: '3 erros que jardins corporativos cometem — e que custam caro',                                                     visual: '5 slides: erro 1 (frequência errada), erro 2 (serviço amador), erro 3 (sem contrato), solução, CTA' },
  { id: '09', pilar: 'educacao',      formato: 'Carrossel', hook: 'Quando é hora de trocar o paisagismo da sua empresa? Esses 4 sinais dizem tudo',                                  visual: 'Fotos de antes ruins + explicação de cada sinal, slide final com CTA "chame a Braun"' },
  { id: '10', pilar: 'educacao',      formato: 'Reel',      hook: 'Quanto custa, na prática, um contrato de manutenção de jardim corporativo? Vou ser direto:',                       visual: 'Diego direto para câmera, fala as faixas de valor sem rodeios, explica o que inclui' },
  { id: '11', pilar: 'educacao',      formato: 'Carrossel', hook: 'A diferença real entre contratar um jardineiro e contratar uma empresa de paisagismo:',                           visual: 'Tabela comparativa visual: seguro, continuidade, compliance, qualidade, preço final' },
  { id: '12', pilar: 'b2b',           formato: 'Reel',      hook: 'O jardim do seu hotel é a primeira impressão do hóspede. O que ele está dizendo sobre você?',                     visual: 'Diego caminhando na frente de hotel, apontando os detalhes que hóspedes notam' },
  { id: '13', pilar: 'b2b',           formato: 'Carrossel', hook: 'Por que hotéis da Serra Gaúcha precisam de paisagismo de nível hospitality',                                       visual: '5 slides: contexto turismo da Serra, fotos de hotéis premium + jardins, diferencial, CTA' },
  { id: '14', pilar: 'b2b',           formato: 'Reel',      hook: 'Síndico: seu jardim valoriza ou desvaloriza seu condomínio? Resposta direta:',                                    visual: 'Diego falando para câmera com dados sobre valorização imobiliária e percepção de moradores' },
  { id: '15', pilar: 'b2b',           formato: 'Carrossel', hook: 'A Braun Paisagismo atende quem? Veja se você se encaixa:',                                                         visual: 'Perfil do cliente ideal: hotel, condo, empresa; o que a Braun NÃO faz; CTA para orçamento' },
  { id: '16', pilar: 'fundador',      formato: 'Reel',      hook: 'Trabalhei em fábrica de calçados. Fui demitido. Hoje tenho contratos com hotéis 4 estrelas. O que aconteceu:',    visual: 'Diego olhando para câmera, tom direto, conta a trajetória real em 60 segundos' },
  { id: '17', pilar: 'fundador',      formato: 'Reel',      hook: 'Por que eu recuso cliente que só compra por preço — e como isso mudou meu negócio',                               visual: 'Diego direto, opinião, explica o conceito de cliente ideal sem citar nomes' },
  { id: '18', pilar: 'fundador',      formato: 'Reel',      hook: 'O maior erro que cometi nos primeiros anos da Braun Paisagismo — e o que aprendi:',                               visual: 'Diego honesto, menciona o erro (ceder no preço por medo), conta a virada de mentalidade' },
  { id: '19', pilar: 'fundador',      formato: 'Reel',      hook: 'Essa descoberta sobre minha carteira de clientes mudou completamente a empresa. Olha:',                           visual: 'Diego conta (sem expor nomes) que 11 clientes eram deficitários, o que aconteceu quando desligou' },
  { id: '20', pilar: 'fundador',      formato: 'Reel',      hook: 'Por que eu prefiro fechar 2 contratos grandes a ter 20 clientes pequenos. Deixa eu te mostrar os números:',       visual: 'Diego explicando a lógica de margem e deslocamento, mostrando como isso funciona na prática' },
]

const pilarBadge: Record<string, string> = {
  transformacao: 'bg-forest-100 text-forest-800 border-forest-200',
  bastidores:    'bg-teal-100 text-teal-800 border-teal-200',
  educacao:      'bg-blue-100 text-blue-800 border-blue-200',
  b2b:           'bg-amber-100 text-amber-800 border-amber-200',
  fundador:      'bg-purple-100 text-purple-800 border-purple-200',
}
const pilarLabel: Record<string, string> = {
  transformacao: 'Transformação',
  bastidores:    'Bastidores',
  educacao:      'Educação',
  b2b:           'Posic. B2B',
  fundador:      'Fundador',
}

function loadUsed(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(IG_IDEAS_KEY) || '[]')) } catch { return new Set() }
}
function saveUsed(s: Set<string>) {
  try { localStorage.setItem(IG_IDEAS_KEY, JSON.stringify([...s])) } catch {}
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function InstagramBraun() {
  const [used, setUsed] = useState<Set<string>>(loadUsed)
  const [activePilar, setActivePilar] = useState<string | null>(null)
  const [openPilar, setOpenPilar] = useState<string | null>(null)

  const toggleUsed = (id: string) => {
    const next = new Set(used)
    if (next.has(id)) next.delete(id); else next.add(id)
    setUsed(next)
    saveUsed(next)
  }

  const filtered = activePilar ? ideias.filter(i => i.pilar === activePilar) : ideias
  const usedCount = used.size

  return (
    <section id="instagram" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Captação orgânica</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Instagram — Founder-Led Growth</h2>
          <p className="text-gray-500 mt-2">@braun_paisagismo é uma alavanca dormindo. Cada post é uma visita de prospecção gratuita.</p>
        </div>

        {/* Diagnóstico */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">Diagnóstico: Instagram negligenciado</p>
            <p className="text-amber-800 text-sm mt-1">
              O gerente de hotel que vai te contratar pesquisa o <strong>@braun_paisagismo</strong> antes de responder o orçamento. Um perfil parado passa a mensagem errada. Seus concorrentes <strong>não fazem</strong> Instagram B2B — o espaço está aberto.
            </p>
          </div>
        </div>

        {/* Founder-Led Growth */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <div className="flex items-center gap-2 mb-5">
            <Flame size={18} className="text-gold-500" />
            <p className="font-bold text-lg">Founder-Led Growth — por que funciona para a Braun</p>
          </div>
          <p className="text-white/70 text-sm mb-6 max-w-2xl leading-relaxed">
            Em B2B de serviços, as pessoas compram <strong className="text-white">pessoas</strong>. O hotel não contrata "a empresa Braun Paisagismo" — contrata o <strong className="text-white">Diego Braun</strong>, a pessoa que vai chegar toda semana e cuidar da imagem do negócio deles. Instagram é onde você prova quem você é <em>antes</em> da primeira reunião.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '01', titulo: 'Apareça', desc: 'Seu rosto é a marca. Um Reel com Diego falando converte mais do que 10 fotos de jardim.' },
              { n: '02', titulo: 'Ensine', desc: 'Quem ensina, vende. Conteúdo educacional te posiciona como especialista, não como fornecedor.' },
              { n: '03', titulo: 'Prove', desc: 'Cases com contexto. Não "jardim bonito" — o problema do cliente, a solução, o resultado.' },
            ].map(r => (
              <div key={r.n} className="bg-forest-700/50 rounded-xl p-4">
                <p className="text-gold-500 font-bold text-2xl mb-1 leading-none">{r.n}</p>
                <p className="text-white font-bold text-sm mb-1.5">{r.titulo}</p>
                <p className="text-white/60 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pilares */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Os 5 Pilares de Conteúdo</h3>
        <p className="text-gray-500 text-sm mb-5">Clique em um pilar para filtrar as ideias abaixo. Alterne entre todos para manter o perfil equilibrado.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {pilares.map(p => {
            const isActive = activePilar === p.id
            const isOpen = openPilar === p.id
            return (
              <div key={p.id} className={`rounded-2xl border-2 bg-white transition-all overflow-hidden ${isActive ? 'border-forest-500 shadow-md' : 'border-transparent hover:border-forest-100'}`}>
                <button
                  onClick={() => setActivePilar(prev => prev === p.id ? null : p.id)}
                  className="w-full text-left p-4"
                >
                  <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                    <p.Icon size={16} className="text-white" />
                  </div>
                  <p className="font-bold text-forest-900 text-sm mb-0.5">{p.nome}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.freq}</span>
                </button>
                <button
                  onClick={() => setOpenPilar(prev => prev === p.id ? null : p.id)}
                  className="w-full text-left px-4 pb-3"
                >
                  <p className={`text-xs text-forest-600 font-semibold hover:text-forest-800 transition-colors ${isOpen ? 'text-forest-800' : ''}`}>
                    {isOpen ? '▲ ver menos' : '▼ ver detalhes'}
                  </p>
                  {isOpen && (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                      <p className="text-xs text-forest-700 italic">Gancho: {p.gancho}</p>
                      <span className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full font-medium">{p.formato}</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Calendário semanal */}
        <div className="bg-[#F4F6F0] rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-forest-900 mb-1">Calendário Semanal Padrão</h3>
          <p className="text-gray-500 text-sm mb-5">Mínimo realista: 4 posts + Stories diários</p>
          <div className="grid grid-cols-7 gap-1.5">
            {[
              { dia: 'SEG', acao: 'Transformação',     formato: 'Reel',     bg: 'bg-forest-100 text-forest-800' },
              { dia: 'TER', acao: 'Bastidores',        formato: 'Stories',  bg: 'bg-teal-100 text-teal-800' },
              { dia: 'QUA', acao: 'Educacional',       formato: 'Carrossel',bg: 'bg-blue-100 text-blue-800' },
              { dia: 'QUI', acao: 'Bastidores',        formato: 'Stories',  bg: 'bg-teal-100 text-teal-800' },
              { dia: 'SEX', acao: 'Fundador ou B2B',   formato: 'Reel',     bg: 'bg-purple-100 text-purple-800' },
              { dia: 'SAB', acao: 'Resultado da semana',formato: 'Stories', bg: 'bg-gray-100 text-gray-600' },
              { dia: 'DOM', acao: 'Off ou Repost',     formato: '—',        bg: 'bg-gray-50 text-gray-400' },
            ].map(item => (
              <div key={item.dia} className={`rounded-xl p-2.5 ${item.bg}`}>
                <p className="font-bold text-xs uppercase tracking-wider mb-2">{item.dia}</p>
                <p className="text-xs font-semibold leading-snug mb-1.5">{item.acao}</p>
                <span className="text-xs opacity-60 bg-black/10 px-1.5 py-0.5 rounded-full block w-fit">{item.formato}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banco de Ideias */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-forest-900 text-lg">Banco de Conteúdo — 20 Ideias Prontas</h3>
            <p className="text-gray-500 text-sm mt-0.5">Marque como "publicado" quando executar. {usedCount} / 20 publicados.</p>
          </div>
          {activePilar && (
            <button
              onClick={() => setActivePilar(null)}
              className="text-xs text-forest-700 border border-forest-300 px-3 py-1.5 rounded-lg hover:bg-forest-50 transition-colors"
            >
              Mostrar todos ✕
            </button>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-forest-600 to-gold-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(usedCount / 20) * 100}%` }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {filtered.map(ideia => {
            const isUsed = used.has(ideia.id)
            return (
              <div
                key={ideia.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${isUsed ? 'opacity-50 border-gray-100' : 'border-gray-100 hover:border-forest-200 hover:shadow'}`}
              >
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleUsed(ideia.id)} className="shrink-0 mt-0.5">
                    {isUsed
                      ? <CheckCircle size={22} className="text-green-500" />
                      : <Circle size={22} className="text-gray-200 hover:text-forest-400 transition-colors" />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pilarBadge[ideia.pilar]}`}>{pilarLabel[ideia.pilar]}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{ideia.formato}</span>
                    </div>
                    <p className={`text-sm font-semibold leading-snug mb-2 ${isUsed ? 'line-through text-gray-400' : 'text-forest-900'}`}>
                      {ideia.hook}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{ideia.visual}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA final */}
        <div className="bg-forest-800 rounded-2xl p-6 text-white text-center">
          <TrendingUp size={28} className="text-gold-500 mx-auto mb-3" />
          <p className="font-bold text-lg mb-2">Meta: 1 post por dia nos próximos 30 dias</p>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Não precisa ser perfeito. Um Reel de 30 segundos com você falando sobre o trabalho do dia vale mais do que uma semana de planejamento sem publicar.{' '}
            <span className="text-gold-500 font-semibold">Consistência {'>'} Perfeição.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
