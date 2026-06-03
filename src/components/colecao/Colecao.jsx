
import React from 'react'
import style from './Colecao.module.scss'

function Colecao( {colecao} ) {
 
  return (
    <section className={style.containerColecao}>

      <div className={style.divBusca}>
        <h2 className={style.titulo}> COLEÇÃO</h2>
        <input type="text" placeholder="Buscar: Número, nome, tipo" className={style.input}/>
      </div>

      <div className={style.colecao}>
        <ul className={style.containerListaPokemons}>

          {colecao.map( (pokemon) => (
            <li key={pokemon.id} className={style.containerPokemon}>
              <div className={style.pokemonCard}>
                <section className={style.idPokemon}>
                  <p>#{pokemon.id}</p>
                </section>

                <section className={style.imgPokemon}>
                  <img src={pokemon.img} alt={pokemon.nome} />
                </section>

                <section className={style.infosPokemon}>
                  <p>{pokemon.nome}</p>

                  <span className={style.containerTipos}>
                    <span className={style.tipoPrincipal}>{pokemon.tipoPrincipal}</span>
                    {pokemon.tipoSecundario
                      ? <span className={style.tipoSecundario}> {pokemon.tipoSecundario} </span>
                      : <span className={style.tipoSecundario} style={{visibility: 'hidden'}}>-</span>
                    }
                  </span>

                </section>
              </div>
            </li>
          ))}

        </ul>
      </div>

    </section>
  )
}

export default Colecao