import Cards from '../cards/Cards';
import style from './listaJogo.module.css'
const Lista = () => {
    return (
        <section className={style.jogo}>
            <div className={style.titulos}>
            <h1>Catálogo de jogos</h1>
            <hr />
            </div>
            <div className={style.filtros}>
                <input type="text" name='Pesquisa' placeholder='Pesquisar'/>
                <div className={style.botoes}>
                <button>Menor preço</button>
                <button>Categoria</button>
                </div>
            </div>
            <ul className={style.lista_jogo}>
            <Cards/>
            <Cards/>
            <Cards/>
            </ul>
        </section>

    )
}

export default Lista;