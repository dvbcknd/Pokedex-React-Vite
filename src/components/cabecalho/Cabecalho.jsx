import React from 'react'
import style from './Cabecalho.module.scss'


const Titulo = () => {
  return <h1 className={style.tituloPagina}> Minha Pokedéx </h1>    
}

const Container = ( {totalPokemons} ) => {
  const total = totalPokemons.length;

  return (
    <div className={style.containerSecundarioNav}>
      <input type="checkbox" className="hidden"/> 
      <span className={style.spanContainer}>
        <h3> Pokémons Registrados:</h3>
        <p> {total} </p>
      </span>
    </div>
  )
}


function Sidebar( {totalColecao} ) {
  const totalPokemons = totalColecao;

  return (
    <nav className={style.navSidebar}>
       <Titulo />
       <Container totalPokemons={totalPokemons} />
    </nav>
  )
}

export default Sidebar