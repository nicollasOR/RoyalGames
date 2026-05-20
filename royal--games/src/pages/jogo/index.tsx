import Footer from "@/components/footer/Footer";
import styles from "./jogo.module.css";
import Header from "@/components/header/Header";
import Lista from "@/components/lista/listaJogo";
import {
  cadastrarJogo,
  editarJogo,
  listarJogo,
  listarJogoPorId,
} from "../api/jogoService";
import { erro, notificacao, ToastconfirmarExclusao } from "@/utils/toast";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { verificarAutenticacao } from "@/utils/autenticacao";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { listarPlataforma } from "../api/plataformaService";
import { listarGenero } from "../api/generoService";
import { listarClassificacao } from "../api/classificacaoService";
import { David_Libre } from "next/font/google";
interface Classificacao {
  classificacaoId: number;
  nomeClassificacao: string;
}

interface Genero {
  generoId: number;
  nome: string;
}

interface Plataforma {
  plataformaId: number;
  nome: string;
}

const Jogo = () => {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [imagem, setImg] = useState<File | null>(null);

  const [plataformaSelecionadas, setPlataformasSelecionadas] = useState<number[]>([]);
  const [classificacaoSelecionadas, setClassificacoesSelecionadas] = useState<number[]>([]);
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);

  const [plataformas, setPlataforma] = useState<Plataforma[]>([]);
  const [classificacao, setClassificacao] = useState<Classificacao[]>([]);
  const [genero, setGenero] = useState<Genero[]>([]);

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();
  const id = router.query.id;
  let telaEditar = !!id;

  async function listarPlataforma_Jogo() {
    try {
      const list = await listarPlataforma();
      setPlataforma(list.data);
    } catch (error: any) {
      erro(error.message);
    }
  }

  async function listarGenero_Jogo() {
    try {
      const list = await listarGenero();
      setGenero(list.data);
    } catch (error: any) {
      erro(error.message);
    }
  }

  async function listarClassificacao_Jogo() {
    try {
      const list = await listarClassificacao();
      setClassificacao(list.data);

      // if(!telaEditar && list.data && list.data.length > 0)
      //   setClassificacao(Number(list.data[0].classificacaoId))
    } catch (error: any) {
      erro(error.message);
    }
  }

  async function carregarInformacoes() {
    if (!id) return;
    try{
      const jogo = await listarJogoPorId(Number(id))
      
      setNome(jogo.nome);
      setDescricao(jogo.descrição);
      setClassificacoesSelecionadas(jogo.classificacaoSelecionadas);
      setGenero(jogo.generosSelecionados);
      setPlataforma(jogo.plataformaSelecionadas);

      // if(jogo.generoIds)
      // {
      //   const generoIds = jogo.generoIds.map((p: any) => typeof p ==="object" ? Number(p.generoIds || p.id) : Number(p))
      //   setGenerosSelecionados(generoIds)
      // }

      // if(jogo.plataformaIds)
      // {
      //   const plataformaIds = jogo.plataformaIds.map((p: any) => typeof p ==="object" ? Number(p.plataformaIds || p.id) : Number(p))
      //   setPlataformasSelecionadas(plataformaIds)
      // }

      // if(jogo.classificacaoId)
      // {
      //   const classificacaoIds = Array.isArray(jogo.classificacaoId)
      //   ? Number(jogo.classificacaoId[0])
      //   ? Number(jogo.classificacaoId)
      //   setClassificacoes(classificacaoIds || 0)
      // }
    }

    catch(error:any)
    {
      erro(error.message)
    }
  }

  async function salvarProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const dados = {
        nome,
        descricao,
        imagem,
        preco,
        plataformaIds :plataformaSelecionadas,
        generoIds: generosSelecionados,
        classificacaoId: classificacaoSelecionadas

      };
      if (telaEditar) {
        await editarJogo(Number(id), dados);
        notificacao("Jogo editado!");
      } else {
        await cadastrarJogo(dados);
        notificacao(`${nome} cadastrado!`);
      }
    } catch (error: any) {
      console.log(error.message + ` ${nome}`);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (!verificarAutenticacao()) {
      router.push("/home");
      return;
    }

    setEstaAutenticado(true);
    listarClassificacao_Jogo();
    listarGenero_Jogo();
    listarPlataforma_Jogo();
    carregarInformacoes();
  }, [router.isReady, id]);

  if (!estaAutenticado) return null;

  return (
    <>
      <Header />
      <section className={styles.cadastro}>
        <h1>{telaEditar ? "Editar Jogo" : "Criar Jogo"}</h1>
        <hr />
        <form className={styles.form} onSubmit={salvarProduto}>
          <div className={styles.inserir_dados}>
            <aside className={styles.lado_esq}>
              <div className={styles.secao_inserir}>
                <label htmlFor="nome">Nome</label>
                <input
                  id={styles.item1}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  name="nome"
                />
              </div>
              <div className={styles.list}>
                <div className={styles.secao_inserir}>
                  <label htmlFor="preco">Valor</label>
                  <input
                    id={styles.item2}
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    type="number"
                    name="preco"
                  />
                </div>
                <div className={styles.secao_inserir}>
                  <label htmlFor="">Gênero</label>

                  <select
                    multiple
                    name=""
                    id=""
                    className={styles.opcoes}
                    value={generosSelecionados.map(String)}
                    onChange={(e) => {
                      const selecionados = Array.from(
                        e.target.selectedOptions,
                        (o) => Number(o.value),
                      );
                      setGenerosSelecionados(selecionados);
                    }}
                  >
                    {genero.map((g) => (
                      <option
                        className={styles.opcao}
                        key={g.generoId}
                        value={g.generoId}
                      >
                        {g.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.secao_inserir}>
                  <label htmlFor="">Classificação Indicativa</label>
                  <select
                    name=""
                    id=""
                    className={styles.opcoes}
                    value={classificacaoSelecionadas.map(String)}
                    onChange={(e) =>
                      setClassificacoesSelecionadas(
                        Array.from(e.target.selectedOptions).map((option) => Number(option.value))
                      )
                    }
                  >
                    {classificacao.map((c) => (
                      <option
                        className={styles.opcao}
                        key={c.classificacaoId}
                        value={c.classificacaoId}
                      >
                        {c.nomeClassificacao}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.list} id={styles.inline}>
                <div className={styles.secao_inserir} id={styles.plataforma}>
                  <label htmlFor="">Plataforma</label>
                  <select
                  multiple
                    name=""
                    id=""
                    className={styles.opcoes}
                    value={plataformaSelecionadas.map(String)}
                    onChange={(e) =>
                      setPlataformasSelecionadas(
                        Array.from(e.target.selectedOptions).map((option) => Number(option.value))
                      )
                    }
                  >
                    {plataformas.map((plat) => (
                      <option
                        className={styles.opcao}
                        value={plat.plataformaId}
                        key={plat.plataformaId}
                      >
                        {" "}
                        {plat.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.secao_inserir} id={styles.imagem}>
                  <label htmlFor="">Imagem</label>
                  <input
                    id={styles.item6}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0])
                        setImg(e.target.files[0]);
                      else return;
                    }}
                    type="file"
                  />
                </div>
              </div>
            </aside>
            <aside className={styles.lado_dir}>
              <div className={styles.secao_inserir}>
                <label htmlFor="">Descrição</label>
                <textarea
                  id={styles.item7}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  name=""
                ></textarea>
              </div>
            </aside>
          </div>
          <button>Cadastrar</button>
        </form>
      </section>
      {/* <Lista /> */}
      <Footer />
    </>
  );
};

export default Jogo;
