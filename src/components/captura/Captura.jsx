
import React, { useState, useEffect, use } from 'react'
import style from '../captura/Captura.module.scss'


function Captura() {

  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  const [dataApi, setDataApi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idBusca) return
    async function getApi() {
      try {
        setError(null);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idBusca}`);
                      
        if (!response.ok) {
            throw new Error("Pokémon não encontrado.");
        }
        
        const data = await response.json();
        setDataApi(data);
      } catch (err) {
          setError(err.message);
          setDataApi(null);
      } finally {
        console.log("A requisição terminou.");
      }
    }

    getApi()
  }, [idBusca])

    return (
      <section className={style.containerCaptura}>
        <GetApiPokemon setIdBusca={setIdBusca} />
        <ExibirPokemon dataApi={dataApi} error={error} />
      </section>
    )
}



const GetApiPokemon = ( {setIdBusca} ) => {
  const [idDigitado, setIdDigitado] = useState(); // O que o suário digita
   
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


const ExibirPokemon = ( {dataApi, error} ) => {

  if (error) return <p className={style.mensagemErro}> Pokémon não encontrado... </p>
  if (!dataApi) return <p className={style.mensagem}> Nenhum Pokémon pesquisado... </p>

  const nome =  dataApi.name.toUpperCase();
  const tipoPrincipal = dataApi.types[0].type.name;
  const tipoSecundario = dataApi.types[1]?.type.name;
  const img = dataApi.sprites.other['official-artwork'].front_default;

  return(
    <section className={style.containerExibirPokemon}>

      <div className={style.divInfos}>
        <h3>NOME</h3>
        <p className={style.nome}>{nome}</p>
        <h3>TIPO</h3>
        <div className={style.containerTipos}>
          <span className={style.tipoPrincipal}> {tipoPrincipal} </span>
            {tipoSecundario
              ? <span className={style.tipoSecundario}> {tipoSecundario} </span>
              : <span className={style.tipoSecundario} style={{visibility: 'hidden'}}>-</span>
            }
        </div>
      </div>
      <div className={style.containerImg}>
        <img src={img}
          alt={nome} className=""/>
      </div>

    </section>
  )
}



export default Captura