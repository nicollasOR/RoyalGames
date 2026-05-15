import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import styles from './classificacao.module.css'
const classificacao = () =>{


    return(
        <>
        <Header/>
        <article className={styles.main}>
            <h1></h1>
            <form action="" className={styles.formulario}>
            <input type="text" />
            <div>
            <button>Cancelar</button>
            <button>Salvar</button>
            </div>
            </form>
        </article>

        <Footer/>        
        </>
    )
}