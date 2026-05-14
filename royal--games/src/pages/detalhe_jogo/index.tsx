import Header from "@/components/header/Header";
import style from "./detalhe.module.css";
import Footer from "@/components/footer/Footer";

const detalhe = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <h1>Destalhes do jogo</h1>
        <hr />
        <article className={style.container}>
          <img src="/img/png/lolzin.png" alt="" />

          <div>
            <h2>League Of Legends</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque a
              illo quod quidem illum natus eaque id placeat sunt molestiae,
              tenetur voluptas assumenda consequatur excepturi laboriosam rerum?
              Veritatis id eaque, laudantium laborum nulla odit libero possimus
              velit, est fugit, quia rerum voluptates aliquid. Veniam voluptatum
              architecto, temporibus corporis aliquam ab?
            </p>
          </div>
        </article>
        <div className={style.informacoes}>
          <aside className={style.lado_esq}>
            <span>Classificação indicativa: 18 anos</span>
            <span>Preço: </span>
            <span>Plataformas: </span>
          </aside>
          <aside className={style.lado_dir}>
            <span>Categorias:</span>
            <span>Gêneros: </span>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default detalhe;
