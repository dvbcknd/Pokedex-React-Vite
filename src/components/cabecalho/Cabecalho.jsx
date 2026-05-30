import React from 'react'

import style from '../cabecalho/Cabecalho.module.scss'

const Titulo = () => {
  return <h1 className={style.tituloPagina}> Minha Pokedéx </h1>    
}

const Container = () => {

  return (
    <div className={style.containerSecundarioNav}>
      <input type="checkbox" className="hidden"/> 
      <span className={style.spanContainer}>
        <h3> Pokémons Registrados:</h3>
        <p> 3 </p>
      </span>
    </div>
  )
}


function Sidebar() {
  return (
    <nav className={style.navSidebar}>
       <Titulo />
       <Container />
    </nav>
  )
}

export default Sidebar