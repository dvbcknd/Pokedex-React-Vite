
import './App.css'
import Sidebar from './components/cabecalho/Cabecalho'
import GetApiPokemon from './components/captura/GetApiPokemon'





function App() {
  return (
    <main className='main'>
      <Sidebar />
      <GetApiPokemon />
    </main>
  )
}

export default App
