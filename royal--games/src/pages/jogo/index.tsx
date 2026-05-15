import Footer from "@/components/footer/Footer";
import styles from "./jogo.module.css";
import Header from "@/components/header/Header";
import Lista from "@/components/lista/listaJogo";

const Produto = () => {
  return (
    <>
      <Header />
      <section className={styles.cadastro}>
        <h1>Cadastrar novo jogo</h1>
        <hr />
        <div className={styles.inserir_dados}>
          <aside className={styles.lado_esq}>
          <div className={styles.secao_inserir}>
            <label htmlFor="nome">Nome</label>
            <input id={styles.item1} type="text" name="nome"/>
          </div>
          <div className={styles.list}>
          <div className={styles.secao_inserir}>
            <label htmlFor="preco">Valor</label>
            <input id={styles.item2} type="number" name="preco"/>
          </div>
          <div  className={styles.secao_inserir}>
            <label htmlFor="">Gênero</label>
           <select name="" id="" className={styles.opcoes}>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            </select>
          </div>
          <div  className={styles.secao_inserir}>
            <label htmlFor="">Classificação Indicativa</label>
            <select name="" id="" className={styles.opcoes}>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            </select>

          </div>
          {/* </div> */}
          </div>
        <div className={styles.list} id={styles.inline}>
          <div  className={styles.secao_inserir} id={styles.plataforma}>
            <label htmlFor="">Plataforma</label>
           <select name="" id="" className={styles.opcoes}>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            <option value="" className={styles.opcao}>fasdfasd</option>
            </select>
          </div>
          <div className={styles.secao_inserir} id={styles.imagem}>
            <label htmlFor="">Imagem</label>
            <input id={styles.item6} type="file" />
          </div>
          </div>
          </aside>
          <aside className={styles.lado_dir}>
          <div className={styles.secao_inserir}>
            <label htmlFor="">Descrição</label>
            <textarea id={styles.item7} name=""></textarea>
          </div>
          </aside>
        </div>

        <button>Cadastrar</button>
      </section>
      <Lista />
      <Footer />
    </>
  );
};

export default Produto;
