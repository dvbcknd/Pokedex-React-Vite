
import React, {useState} from 'react'
import style from './Colecao.module.scss'
import trash_icon from '../../icons/trash_icon.svg'
import tipoCores from '../../utils/tipoCores'
import coresCards from '../../utils/coresCardsTipos'

function Colecao( {colecao, delPokemon} ) {
  const [busca, setBusca] = useState('');

  const colecaoFiltrada = colecao.filter((pokemon) =>
    pokemon.nome.toLowerCase().includes(busca.toLowerCase()) ||
    pokemon.id.toString().includes(busca) ||
    pokemon.tipoPrincipal.includes(busca.toLowerCase()) ||
    pokemon.tipoSecundario?.includes(busca.toLowerCase())
  )
  
  return (
    <section className={style.containerColecao}>

      <div className={style.divBusca}>
        <h2 className={style.titulo}> COLEÇÃO</h2>
        <input type="text" placeholder="Buscar: Número, nome, tipo" className={style.input} value={busca} onChange={(e) => setBusca(e.target.value)}/>
      </div>

      <div className={style.colecao}>
        <ul className={style.containerListaPokemons}>

          {colecaoFiltrada.map( (pokemon) => (
            <li key={pokemon.id} className={style.containerPokemon} style={coresCards[pokemon.tipoPrincipal]}>
             
              <section className={style.idPokemon}>
                <p>#{pokemon.id}</p>
                <button onClick={ () => delPokemon(pokemon.id)}><img src={trash_icon} alt="Excluir Pokémon" className={style.excluir}/></button>
              </section>

              <section className={style.imgPokemon}>
                <img src={pokemon.img} alt={pokemon.nome} />
              </section>

              <section className={style.infosPokemon}>
                <p>{pokemon.nome}</p>

                <span className={style.containerTipos}>
                  <span className={style.tipoPrincipal} style={tipoCores[pokemon.tipoPrincipal]}>{pokemon.tipoPrincipal}</span>
                  {pokemon.tipoSecundario
                    ? <span className={style.tipoSecundario}  style={tipoCores[pokemon.tipoSecundario]}>{pokemon.tipoSecundario} </span>
                    : <span className={style.tipoSecundario} style={{visibility: 'hidden'}}>-</span>
                  }
                </span>

              </section>
              
            </li>
          ))}

        </ul>
      </div>

    </section>
  )
}

export default Colecao