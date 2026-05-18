import Footer from "@/components/footer/Footer";
import styles from "./jogo.module.css";
import Header from "@/components/header/Header";
import Lista from "@/components/lista/listaJogo";
import { cadastrarJogo, editarJogo, listarJogo, listarJogoPorId } from "../api/jogoService";
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
  interface Classificacao{
    classificacaoId: number,
    nomeClassificacao: string
  }

  interface Genero{
    generoId: number,
    nome: string
  }

  interface Plataforma{
    plataformaId: number,
    nome: string
  }

  


const Jogo = () => {

  const[nome, setNome] = useState<string>("")
  const[descricao, setDescricao] = useState<string>("")
  const[preco, setPreco] = useState<string>("")
  const[imagem, setImg] = useState<File | null>(null)
  const[plataformaIds, setPlataformaIds] = useState<number[]>([],)
  const[classificacaoId, setClassificacaoId] = useState<number[]>([],)
  const[generoIds, setGeneroIds] = useState<number[]>([],)

  const[estaAutenticado, setEstaAutenticado] = useState<string>("")

  const router = useRouter()
  const id = router.query.id
  let telaEditar = id? true : false

  async function listarPlataforma_Jogo(){
    const list = await listarPlataforma()
    setPlataformaIds(list.data)
  }

  async function listarGenero_Jogo(){
    const list = await listarGenero()
    setGeneroIds(list.data)
  }

  async function listarClassificacao_Jogo(){
    const list = await listarClassificacao()
    setClassificacaoId(list.data)
  }

  async function carregarInformacoes(){
    if(!id) return
    const produto = await listarJogoPorId(Number(id))
    setNome(produto.nome)
    setDescricao(produto.descrição)
    setClassificacaoId(produto.classificacaoId)
    setGeneroIds(produto.generoIds)
    setPlataformaIds(produto.plataformaIds)
  }

  async function salvarProduto(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    try{
      const dados = {
        nome,
        descricao,
        imagem,
        preco,
        plataformaIds,
        generoIds,
        classificacaoId
        // plataformaIds: plataformaIds,
        // generoIds: generoIds,
        // classificacaoId: classificacaoId
      }
      if(telaEditar){
        await editarJogo(Number(id), dados)
        notificacao("Jogo editado!")
      }
      else{
        await cadastrarJogo(dados)
        notificacao("Jogo cadastrado!")
      }
    }

    catch(error: any)
    {
      console.log(error.message)
    }
  }


  
  













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

export default Jogo;
