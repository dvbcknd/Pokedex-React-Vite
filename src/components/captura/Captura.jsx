
import React, { useState, useEffect, use } from 'react'
import style from '../captura/Captura.module.scss'


const GetApiPokemon = () => {

  const [idDigitado, setIdDigitado] = useState(''); // O que o suário digita
  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  const [dataApi, setDataApi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idBusca) return;

    async function getApi() {
      try {
        setError(null);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idBusca}`);
                    
        if (!response.ok) {
          throw new Error("Pokémon não encontrado.");
        }
                    
        const data = await response.json();
        console.log(data)
        setDataApi(data);

      } catch (err) {
          setError(err.message);
          setDataApi(null);
      } finally {
        console.log("A requisição terminou.");
      }
    }

    getApi();
  },[idBusca]);


  return (
    <section className={style.containerGetPokemonApi}>

      <div className={style.preencher}>
        <p>Número Pokemon:</p>
        <input type="number" placeholder="EX: 1" value={idDigitado} onChange={ (e)=> setIdDigitado(e.target.value)}/>
      </div>

      <div className={style.buttons}>
        <button className={style.buttonAuto} onClick={()=> setIdBusca(idDigitado)}>Auto preencher</button>
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

          <div className={style.containerTipos}>

            <span className={style.tipoPrincipal}>
              Grass
            </span>

            <span className={style.tipoSecundario}>
              Poison
            </span>

          </div>

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