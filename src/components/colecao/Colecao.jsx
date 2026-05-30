
import React from 'react'
import style from '../colecao/Colecao.module.scss'

function Colecao() {
  return (
    <section className={style.containerColecao}>
      <div className={style.divBusca}>
        <h2> COLEÇÃO</h2>
        <input type="text" placeholder="Buscar: Número, nome, tipo" />
      </div>

      <div>

      </div>
    </section>
  )
}

export default Colecao