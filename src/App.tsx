import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tarefas from './components/Tarefas'
import Diagnostico from './components/Diagnostico'
import PlanoAcao from './components/PlanoAcao'
import Arsenal from './components/Arsenal'
import Alvos from './components/Alvos'
import AbordagemComercial from './components/AbordagemComercial'
import ProvaFocal from './components/ProvaFocal'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Tarefas />
      <Diagnostico />
      <PlanoAcao />
      <Arsenal />
      <Alvos />
      <AbordagemComercial />
      <ProvaFocal />
      <Footer />
    </div>
  )
}
