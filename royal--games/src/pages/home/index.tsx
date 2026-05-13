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
        <div>
        <section id={styles.destaque}>
            <h2>Jogos online podem afetar o comportamento humano?</h2>
            <hr/>
            <div className={styles.destaque_hero}>
                <div>
                    <img src="../img/png/lolzin.png" alt="" />
                    <img src="../img/png/cszinho.png" alt="" />
                </div>
                    <article>
                        <p> Estudos indicam que jogos podem alterar o comportamento humano…</p>
                        <p> Principalmente quando o time resolve testar sua paciência em plena partida ranqueada.</p>
                    </article>
            </div>

        </section>
        <Footer/>
        </div>
        </>
    )
}

export default Home;