import Header from "@/components/header/Header";
import styles from "./home.module.css"
import Footer from "@/components/footer/Footer";
import Lista from "@/components/lista/listaJogo";
const Home = () => {


    return (
        <>
        <Header/>
        <main className={styles.main}>
        <section className={styles.banner}>
            <div className={styles.textos}>
                <h1>Conheça nossos jogos!</h1>
                <p>Navegue por títulos de todas as gerações, descubra plataformas, gêneros e detalhes completos antes de escolher sua próxima aventura. Seu próximo jogo favorito começa aqui</p>
            </div>
            <img src="img/png/imagem_banner.png" alt="" className={styles.hero} />
        </section>
        <Lista/>
        </main>
        <Footer/>
        </>
    )
}

export default Home;