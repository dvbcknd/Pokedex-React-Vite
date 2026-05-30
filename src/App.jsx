
import './App.css'
import Sidebar from './components/cabecalho/Cabecalho'
import Captura from './components/captura/Captura'
import Colecao from './components/colecao/Colecao'




function App() {
  

  return (
    <main className='main'>
      <Sidebar />
      <Captura />
      <Colecao />
    </main>
  )
}

export default App
