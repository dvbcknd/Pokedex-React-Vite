import { useState } from 'react'
import './App.css'
import Sidebar from './components/cabecalho/Cabecalho'
import GetApiPokemon from './components/captura/GetApiPokemon'

function App() {
  //Verifica o Local Storege e tiver vázio retorna array vazio a colecao
  const [colecao, setColecao] = useState(() => {
    const salvo = localStorage.getItem('colecao')
    return salvo ? JSON.parse(salvo) : []
  })

  return (
    <main className='main'>
      <Sidebar totalColecao={colecao} />
      <GetApiPokemon colecao={colecao} setColecao={setColecao} />
    </main>
  )
}

export default App