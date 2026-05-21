import { MapPin, TrendingUp, CheckCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react'

const ancoras = [
  { initials: 'B', color: 'bg-gold-500', name: 'Banrisul Três Coroas', segment: 'Agência Bancária', margem: '69%', status: '✅ ATIVO' },
  { initials: 'HH', color: 'bg-forest-600', name: 'Hanna Hotéis', segment: 'Rede Hoteleira', margem: '41%', status: '✅ ATIVO' },
  { initials: 'HG', color: 'bg-forest-500', name: 'Hortencias Garden', segment: 'Espaço de Eventos', margem: '40%', status: '✅ ATIVO' },
  { initials: 'P', color: 'bg-forest-700', name: 'Pedro', segment: 'Cliente Premium', margem: '38%', status: '✅ ATIVO' },
]

export default function Alvos() {
  return (
    <section id="alvos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Oportunidades abertas</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Alvos Estratégicos</h2>
          <p className="text-gray-500 mt-2">Os dois contratos que mudam tudo — processo aberto agora</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            <strong>Ambos os alvos já têm processo aberto.</strong> Snowland: você ligou em 12/05 e o processo ainda está em andamento. Isso não é cold call — é finalização.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Snowland */}
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl overflow-hidden">
            <div className="p-6 text-white">
              <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                PROCESSO ABERTO — RETOMADA
              </span>
              <h3 className="text-2xl font-bold mb-1">Snowland</h3>
              <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
                <MapPin size={13} /> Gramado, RS — ~40km/visita
              </div>

              <div className="bg-forest-900/50 rounded-xl p-4 mb-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-gold-500 text-xl font-bold">R$ 8.800</div>
                  <div className="text-white/50 text-xs mt-0.5">Projeção/mês</div>
                </div>
                <div>
                  <div className="text-gold-500 text-xl font-bold">49%</div>
                  <div className="text-white/50 text-xs mt-0.5">Margem</div>
                </div>
                <div>
                  <div className="text-gold-500 text-xl font-bold">R$ 7.500</div>
                  <div className="text-white/50 text-xs mt-0.5">Piso mínimo</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <TrendingUp size={11} /> RISCO BAIXO — Deslocamento controlado
              </span>

              <p className="text-white/70 text-sm mb-4">
                Você ligou em 12/05. Eles disseram que o processo ainda está aberto e que podem receber uma proposta atualizada. O preço não é o único critério.
              </p>

              <ul className="flex flex-col gap-1.5 mb-5">
                {['Você já tem relacionamento com o local', 'Portfólio de hotéis preparado', 'Preço competitivo com margem saudável'].map(s => (
                  <li key={s} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle size={13} className="text-green-400 shrink-0" /> {s}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <Clock size={13} className="text-gold-400 shrink-0" /> Próximo passo: ligar até 25/05 para agendar visita
                </li>
              </ul>

              <a
                href="https://geradordepropostaselva.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                Gerar Proposta Snowland <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* H. Buona Vitta */}
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl overflow-hidden">
            <div className="p-6 text-white">
              <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                PROCESSO IDENTIFICADO — ALTA OPORTUNIDADE
              </span>
              <h3 className="text-2xl font-bold mb-1">H. Buona Vitta</h3>
              <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
                <MapPin size={13} /> Serra Gaúcha — confirmar localização exata
              </div>

              <div className="bg-forest-900/50 rounded-xl p-4 mb-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-gold-500 text-xl font-bold">R$ 14.632</div>
                  <div className="text-white/50 text-xs mt-0.5">Projeção/mês</div>
                </div>
                <div>
                  <div className="text-gold-500 text-xl font-bold">49%</div>
                  <div className="text-white/50 text-xs mt-0.5">Margem</div>
                </div>
                <div>
                  <div className="text-gold-500 text-xl font-bold">R$ 12.000</div>
                  <div className="text-white/50 text-xs mt-0.5">Piso mínimo</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <AlertTriangle size={11} /> RISCO MODERADO — Confirmar rota antes de fechar
              </span>

              <p className="text-white/70 text-sm mb-4">
                Maior potencial financeiro da lista. Exige atenção ao deslocamento: 4 visitas/mês × 57km. Com roteirização junto a outros clientes, o custo real cai significativamente.
              </p>

              <ul className="flex flex-col gap-1.5 mb-5">
                {['Potencial de receita mais alto da lista', 'Margem de 49% mesmo com deslocamento'].map(s => (
                  <li key={s} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle size={13} className="text-green-400 shrink-0" /> {s}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-xs text-amber-300/90">
                  <AlertTriangle size={13} className="shrink-0" /> Confirmar localização exata antes de gerar proposta
                </li>
                <li className="flex items-center gap-2 text-xs text-white/80">
                  <Clock size={13} className="text-gold-400 shrink-0" /> Próximo passo: primeiro contato até 27/05
                </li>
              </ul>

              <a
                href="https://geradordepropostaselva.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                Gerar Proposta H. Buona Vitta <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Clientes Âncora */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Seus 4 Clientes de Alta Margem</h3>
        <p className="text-gray-500 text-sm mb-5">Eles são a base — e devem ser a porta de entrada para novos contratos similares.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ancoras.map((a, i) => (
            <div key={i} className="bg-[#F4F6F0] rounded-xl p-4 border border-gray-200 flex flex-col gap-2">
              <div className={`w-10 h-10 rounded-full ${a.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {a.initials}
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">{a.name}</p>
                <p className="text-gray-500 text-xs">{a.segment}</p>
              </div>
              <span className="inline-block bg-gold-100 text-gold-600 text-xs font-bold px-2 py-0.5 rounded-full w-fit">
                {a.margem} margem
              </span>
              <span className="text-xs text-green-700 font-medium">{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
