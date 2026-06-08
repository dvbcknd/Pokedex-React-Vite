
import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch';
import style from './GetApiPokemon.module.scss'
import Colecao from '../colecao/Colecao';
import tipoCores from '../../utils/tipoCores'


function GetApiPokemon( {colecao, setColecao} ) {
  const [idBusca, setIdBusca] = useState(null); // O ID que dispara a busca
  //Usa o hooke personalizado, se tiver id, envia para o hook a URL, se não, envia NULL
  const {data: pokemons, loading, error} = useFetch(
    idBusca ? `https://pokeapi.co/api/v2/pokemon/${idBusca}` : null
  );
  const [jaExiste, setJaExiste] = useState(false);
  const [add, setAdd] = useState(false);

  //Salva os dados no Local Storage
  useEffect(() => {
    localStorage.setItem('colecao', JSON.stringify(colecao))
  }, [colecao])


  const deletePokemon = (id) =>{
    setColecao(colecao.filter( p => p.id !== id ));
  }

  const addPokemon = () =>{
    if (!pokemons) return; //Impede tentar adicionar quando não foi feito a pesquisa.

    const pokemon = {
      id: pokemons.id,
      nome: pokemons.name.toUpperCase(),
      tipoPrincipal: pokemons.types[0].type.name,
      tipoSecundario: pokemons.types[1]?.type.name || null,
      img: pokemons.sprites.other['official-artwork'].front_default,
    } 

    //Se o Pokémon já existe exibe mensagem.
    if (colecao.some( (pokemon) => pokemon.id === pokemons.id )){
      setJaExiste(true);
      setTimeout( () => setJaExiste(false), 2000)
      return
    }else {
      //Adiciona o Pokémon e exibe mensagem.
      setColecao([...colecao, pokemon])
      setAdd(true);
      setTimeout( () => setAdd(false), 2000)
    }
  }

  return (
    <div className={style.conteinerPrincipal}>
      <section className={style.containerCaptura}>
        <Captura setIdBusca={setIdBusca} addPokemon={addPokemon} existe={jaExiste} add={add}/>
        <ExibirPokemon pokemons={pokemons} error={error} loading={loading} />
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


const ExibirPokemon = ( {pokemons, error, loading} ) => {

  if (error) return <p className={style.mensagemErro}> Pokémon não encontrado... </p>
  if (!pokemons) return <p className={style.mensagem}> Nenhum Pokémon pesquisado... </p>
  if (loading) return <p className={style.mensagemCarregando}> Carregando dados do Pokémon... </p> 

  const id = pokemons.id;
  const nome =  pokemons.name.toUpperCase();
  const tipoPrincipal = pokemons.types[0].type.name;
  const tipoSecundario = pokemons.types[1]?.type.name;
  const img = pokemons.sprites.other['official-artwork'].front_default;

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