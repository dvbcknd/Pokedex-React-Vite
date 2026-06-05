
import React, { useState, useEffect, use } from 'react'
import style from './GetApiPokemon.module.scss'
import Colecao from '../colecao/Colecao';
import tipoCores from '../../utils/tipoCores'


function GetApiPokemon( {colecao, setColecao} ) {

  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  const [dataApi, setDataApi] = useState(null);
  const [error, setError] = useState(null);
  const [jaExiste, setJaExiste] = useState(false);
  const [add, setAdd] = useState(false);


  useEffect(() => {
    localStorage.setItem('colecao', JSON.stringify(colecao))
  }, [colecao])


  const deletePokemon = (id) =>{
    setColecao(colecao.filter( p => p.id !== id ));
  }


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
      setJaExiste(true);
      setTimeout( () => setJaExiste(false), 2000)
      return
    }else {
      setColecao([...colecao, pokemon])
      setAdd(true);
      setTimeout( () => setAdd(false), 2000)
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
        <Captura setIdBusca={setIdBusca} addPokemon={addPokemon} existe={jaExiste} add={add}/>
        <ExibirPokemon dataApi={dataApi} error={error} />
      </section>
      <Colecao colecao={colecao} delPokemon={deletePokemon} />
    </div>
    )
}



const Captura = ( {setIdBusca, addPokemon, existe, add} ) => {
  const [idDigitado, setIdDigitado] = useState(''); // O que o suário digita

  const limparInput = () => {
    setIdDigitado('');
  }
   
  return (
    <section className={style.containerGetPokemonApi}>
      <div className={style.preencher}>
        <p>Número Pokemon:</p>
        <input type="number" placeholder="EX: 1" value={idDigitado} onChange={ (e)=> setIdDigitado(e.target.value)}/>
      </div>
      <div className={style.buttons}>
        <button className={style.buttonAuto} onClick={()=> { setIdBusca(idDigitado); limparInput() }}>Auto preencher</button>
        <button className={style.buttonRegistrar} onClick={addPokemon}>Registrar Pokémon</button>
      </div>
      {existe && (
          <p className={style.avisoExiste}>O Pokémon já existe na coleção!</p>
        )}

      {add && (
        <p className={style.avisoadd}>Pokémon adicionado com sucesso!</p>
      )}
    </section>
  )
}


const ExibirPokemon = ( {dataApi, error} ) => {
  if (error) return <p className={style.mensagemErro}> Pokémon não encontrado... </p>
  if (!dataApi) return <p className={style.mensagem}> Nenhum Pokémon pesquisado... </p>

  const id = dataApi.id;
  const nome =  dataApi.name.toUpperCase();
  const tipoPrincipal = dataApi.types[0].type.name;
  const tipoSecundario = dataApi.types[1]?.type.name;
  const img = dataApi.sprites.other['official-artwork'].front_default;

  return(
    <section className={style.containerExibirPokemon}>

      <div className={style.divInfos}>
        <h3>ID</h3>
        <p className={style.id}>#{id}</p>
        <h3>NOME</h3>
        <p className={style.nome}>{nome}</p>
        <h3>TIPO</h3>
        <div className={style.containerTipos}>
          <span className={style.tipoPrincipal} style={tipoCores[tipoPrincipal]}>{tipoPrincipal}</span>
            {tipoSecundario
              ? <span className={style.tipoSecundario} style={tipoCores[tipoSecundario]}>{tipoSecundario}</span>
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