
import React, { useState, useEffect, use } from 'react'
import style from './GetApiPokemon.module.scss'
import Colecao from '../colecao/Colecao';


function GetApiPokemon() {

  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  const [dataApi, setDataApi] = useState(null);
  const [error, setError] = useState(null);
  const [colecao, setColecao] = useState(() => {
    const salvo = localStorage.getItem('colecao')
      return salvo ? JSON.parse(salvo) : []
  });

  useEffect(() => {
    localStorage.setItem('colecao', JSON.stringify(colecao))
  }, [colecao])

  const addPokemon = () =>{
    if (!dataApi) return;

    const pokemon = {
      id: dataApi.id,
      nome: dataApi.name.toUpperCase(),
      tipoPrincipal: dataApi.types[0].type.name,
      tipoSecundario: dataApi.types[1]?.type.name || null,
      img: dataApi.sprites.other['official-artwork'].front_default,
    } 

    if (colecao.some( (pokemon) => pokemon.id === dataApi.id )){
      return
    }else {
      setColecao([...colecao, pokemon])
    }
  }


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
    <div className={style.conteinerPrincipal}>
      <section className={style.containerCaptura}>
        <Captura setIdBusca={setIdBusca} addPokemon={addPokemon} />
        <ExibirPokemon dataApi={dataApi} error={error} />
      </section>
      <Colecao colecao={colecao} />
    </div>
    )
}



const Captura = ( {setIdBusca, addPokemon} ) => {
  const [idDigitado, setIdDigitado] = useState(''); // O que o suário digita
   
  return (
    <section className={style.containerGetPokemonApi}>
      <div className={style.preencher}>
        <p>Número Pokemon:</p>
        <input type="number" placeholder="EX: 1" value={idDigitado} onChange={ (e)=> setIdDigitado(e.target.value)}/>
      </div>
      <div className={style.buttons}>
        <button className={style.buttonAuto} onClick={()=> setIdBusca(idDigitado)}>Auto preencher</button>
        <button className={style.buttonRegistrar} onClick={addPokemon}>Registrar Pokémon</button>
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



export default GetApiPokemon