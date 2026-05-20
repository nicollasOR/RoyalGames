import Header from "@/components/header/Header";
import style from "./detalhe.module.css";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { listarJogo, listarJogoPorId } from "../api/jogoService";
import { erro, notificacao } from "@/utils/toast";
import { formatarPreco } from "@/utils/formatacao";

interface produtoListagem {
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  classificaco: string[],
  plataforma: string[],
  genero: string[],
}

interface Classificacao {
  classificacaoId: number,
  nomeClassificacao: string
}

interface Genero {
  generoId: number,
  nome: string
}

interface Plataforma {
  plataformaId: number,
  nome: string
}

const detalhe = () => {
  const [jogo, setJogo] = useState<produtoListagem>()

  const router = useRouter()
  const { id } = router.query

  async function listarJoguinho() {
    if (!id) return
    try {
      const response = await listarJogoPorId(Number(id))
      setJogo(response)
      console.log(response)
    }
    catch (error: any) {
      erro(error.response)
    }
  }


  useEffect(() => {
    if (router.isReady)
      listarJoguinho()

  }, [router.isReady, id])

  if (!jogo)
    return null
  // async function listarPlataforma_Jogo(){
  //   const list = await listarPlataforma()
  // }

  return (
    <>
      <Header />
      <main className={style.main}>
        <h1>Destalhes do jogo</h1>
        <hr />
        <article className={style.container}>
          <img src={jogo.imagem} alt="" />

          <div>
            <h2>Nome: {jogo.nome}</h2>
            <p>

              {jogo.descricao}
            </p>
          </div>
        </article>
        <div className={style.informacoes}>
          <aside className={style.lado_esq}>
            <span>Classificacao: {jogo.classificaco}</span>
            <span>Preço: {formatarPreco(jogo.preco)}</span>
            <span>Plataforma: {jogo.plataforma?.map((plataformas) => (
              <p key={plataformas}>{plataformas}</p>
            ))}</span>
          </aside>
          <aside className={style.lado_dir}>
            <span>Categorias: {jogo.classificaco?.map((clas) => (
              <p key={clas}> {clas} </p>
            ))}</span>
            <span>Gêneros: {jogo.genero?.map((gen) => (
              <p key={gen}> {gen}</p>
            ))}</span>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default detalhe;
