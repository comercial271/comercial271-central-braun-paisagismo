import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tarefas from './components/Tarefas'
import Diagnostico from './components/Diagnostico'
import PlanoAcao from './components/PlanoAcao'
import Arsenal from './components/Arsenal'
import LinksRapidos from './components/LinksRapidos'
import Alvos from './components/Alvos'
import AbordagemComercial from './components/AbordagemComercial'
import InstagramBraun from './components/InstagramBraun'
import IcpBraun from './components/IcpBraun'
import ProvaFocal from './components/ProvaFocal'
import MinhaJornada from './components/MinhaJornada'
import Footer from './components/Footer'
import HelpButton from './components/HelpButton'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Tarefas />
      <Diagnostico />
      <PlanoAcao />
      <Arsenal />
      <LinksRapidos />
      <Alvos />
      <AbordagemComercial />
      <InstagramBraun />
      <IcpBraun />
      <ProvaFocal />
      <MinhaJornada />
      <Footer />
      <HelpButton />
    </div>
  )
}
