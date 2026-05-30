
import React, { useState, useEffect } from 'react'
import style from '../captura/Captura.module.scss'

const GetApiPokemon = () => {

  const [idDigitado, setIdDigitado] = useState(''); // O que o suário digita
  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  const [dataApi, setDataApi] = useState(null);
  const [error, setError] = useState(null);

  return (
    <section className={style.containerGetPokemonApi}>

      <div className={style.preencher}>
        <p>Número Pokemon:</p>
        <input type="number" placeholder="EX: 1"/>
      </div>

      <div className={style.buttons}>
        <button className={style.buttonAuto}>Auto preencher</button>
        <button className={style.buttonRegistrar}>Registrar Pokémon</button>
      </div>

    </section>
  )
}



const ExibirPokemon = () => {

  return(
    <section className={style.containerExibirPokemon}>

      <div className={style.divInfos}>
          <h3>NOME</h3>
          <p className={style.nome}>Bulbassaur</p>
          <h3>TIPO</h3>
          <span className={style.containerTipos}>
            <p className={style.tipoPrincipal}>Grass</p>
            <p className={style.tipoSecundario}>Poison</p>
          </span>
      </div>

      <div className={style.containerImg}>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
          alt="Bulbasaur" className=""/>
      </div>

    </section>
  )
}



function Captura() {
  return (
    <section className={style.containerCaptura}>
      <GetApiPokemon />
      <ExibirPokemon />
      
    </section>
  )
}

export default Captura