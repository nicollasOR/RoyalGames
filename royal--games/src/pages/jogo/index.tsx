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
  // const[classificacaoId, setClassificacaoId] = useState<number[]>([],)
  const[classificacaoId, setClassificacaoId] = useState<number>(0)
  const[generoIds, setGeneroIds] = useState<number[]>([],)

  //produtos do get
  const[plataformaIdsList, setPlataformaIdsList] = useState<Plataforma[]>([])
  // const[classificacaoId, setClassificacaoId] = useState<number[]>([],)
  const[classificacaoIdList, setClassificacaoIdList] = useState<Classificacao[]>([])
  const[generoIdsList, setGeneroIdsList] = useState<Genero[]>([])

  const[estaAutenticado, setEstaAutenticado] = useState(false)

  const router = useRouter()
  const id = router.query.id
  let telaEditar = id? true : false

  async function listarPlataforma_Jogo(){
    const list = await listarPlataforma()
    setPlataformaIdsList(list.data)
  }

  async function listarGenero_Jogo(){
    const list = await listarGenero()
    setGeneroIdsList(list.data)
  }

  async function listarClassificacao_Jogo(){
    const list = await listarClassificacao()
    setClassificacaoIdList(list.data)
  }

  async function carregarInformacoes(){
    if(!id) return
    const produto = await listarJogoPorId(Number(id))
    setNome(produto.nome)
    setDescricao(produto.descrição)
    setClassificacaoIdList(produto.classificacaoId)
    setGeneroIdsList(produto.generoIds)
    setPlataformaIdsList(produto.plataformaIds)
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

  useEffect(() => {
    if(!router.isReady) return;
    if(!verificarAutenticacao())
      {
          router.push("/home")
          return;
    }

    setEstaAutenticado(true)
    listarClassificacao_Jogo()
    listarGenero_Jogo()
    listarPlataforma_Jogo()
    carregarInformacoes()

    
  }, [router.isReady, id] )

  if(!estaAutenticado) return null


  
  













  return (
    <>
      <Header />
      <section className={styles.cadastro}>
        <h1>{telaEditar ? "Editar Jogo" : "Criar Jogo"}</h1>
        <hr />
        <form  className={styles.inserir_dados} onSubmit={salvarProduto}>
          <aside className={styles.lado_esq}>
          <div className={styles.secao_inserir}>
            <label htmlFor="nome">Nome</label>
            <input id={styles.item1} value={nome} onChange={(e) => setNome(e.target.value)} type="text" name="nome"/>
          </div>
          <div className={styles.list}>
          <div className={styles.secao_inserir}>
            <label htmlFor="preco">Valor</label>
            <input id={styles.item2} value={preco} onChange={(e) => setPreco(e.target.value)} type="number" name="preco"/>
          </div>
          <div  className={styles.secao_inserir}>
            <label htmlFor="">Gênero</label>
            
           <select name="" id="" className={styles.opcoes} value={generoIdsList.map(String)} onChange={(e) =>{ const selecionados = Array.from(e.target.selectedOptions, (o) => Number(o.value)); setGeneroIds(selecionados)}}>
            {generoIdsList.map((g) =>(
              <option className={styles.opcao}  key={g.generoId} value={g.generoId}> {g.nome}</option>
            ))}
            {/* 
            
                            <select
                  multiple
                  className={styles.opcoes}
                  value={generoIdsSelecionados.map(String)}
                  onChange={(e) => {
                    const selecionados = Array.from(e.target.selectedOptions, (o) => Number(o.value));
                    setGeneroIdsSelecionados(selecionados);
                  }}
                >
                  {listaGeneros.map((g) => (
                    <option key={g.generoId} value={g.generoId}>{g.nome}</option>
                  ))}
            */}



            </select>
          </div>
          <div  className={styles.secao_inserir}>
            <label htmlFor="">Classificação Indicativa</label>
            <select name="" id="" className={styles.opcoes} 
            value={classificacaoId}
            onChange={(e) => setClassificacaoId(Number(e.target.value))}>
              <option value={0}>Selecione</option>
              {classificacaoIdList.map((c) =>(
                <option className={styles.opcao} key={c.classificacaoId} value={c.classificacaoId}>
                {c.nomeClassificacao}
              </option>
              ))}

            

            </select>
            {/*             <select
              value={categoriasSelecionadas.map(String)}
              multiple
              onChange={(e) =>
                setCategoriaSelecionadas(
                  Array.from(e.target.selectedOptions).map((option) =>
                    Number(option.value)
                  )
                )
              }
              id={styles.select}
            >
              {categorias.map((item) => (
                <option value={item.categoriaId} key={item.categoriaId}>
                  {item.nome}
                </option>
              ))}*/}
          </div>
          {/* </div> */}
          </div>
        <div className={styles.list} id={styles.inline}>
          <div  className={styles.secao_inserir} id={styles.plataforma}>
            <label htmlFor="">Plataforma</label>
           <select name="" id="" className={styles.opcoes} value={plataformaIdsList.map(String)} onChange={(e) => { const selecionados = Array.from(e.target.selectedOptions, (o) => Number(o.value)); setPlataformaIds(selecionados)}}>
            {plataformaIdsList.map((plat) => (
              <option className={styles.opcao} value={plat.plataformaId} key={plat.plataformaId}> {plat.nome}</option>
            ))}
            </select>
          </div>
          <div className={styles.secao_inserir} id={styles.imagem}>
            <label htmlFor="">Imagem</label>
            <input id={styles.item6} 
            onChange={(e) => {
                if (e.target.files && e.target.files[0])
                  setImg(e.target.files[0]);
                else return;
              }}
            type="file" />
          </div>
          </div>
          </aside>
          <aside className={styles.lado_dir}>
          <div className={styles.secao_inserir}>
            <label htmlFor="">Descrição</label>
            <textarea id={styles.item7} value={descricao} onChange={(e) => setDescricao(e.target.value)} name=""></textarea>
          </div>
          </aside>
        </form>

        <button>Cadastrar</button>
      </section>
      <Lista />
      <Footer />
    </>
  );
};

export default Jogo;
