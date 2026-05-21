import Cards from "../cards/Cards";
import style from "./listaJogo.module.css";
import { useEffect, useState } from "react";
import { formatarPreco } from "@/utils/formatacao";
import { verificarAutenticacao } from "@/utils/autenticacao";
import Link from "next/link";
import { excluirJogo, listarJogo } from "@/pages/api/jogoService";
import { erro, notificacao } from "@/utils/toast";
import Jogo from "@/pages/jogo";

type Jogo = {
  nome: string;
  descricao: string;
  preco: number;
  img: string;
  jogoId: number;
  onDelete: (jogoId: number) => void;
  usuarioAutenticado: boolean;
};

const Lista = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [ordem, setOrdem] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  async function listar() {
    try {
      const lista = await listarJogo();
      setJogos(lista);
    } catch (error: any) {
      alert(error.message);
    }
  }
  async function confirmarExclusão(jogoId: number) {
    try {
      await excluirJogo(jogoId);
      setJogos((listaAtual) =>
        listaAtual.map((jogos) =>
          jogos.jogoId === jogoId ? { ...jogos, statusJogo: false } : jogos,
        ),
      );
      notificacao("Jogo Excluído com Sucesso");
      listar();
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
    listar();
  }, []);


  const jogosFiltrados = jogos.filter((joguinhos) => joguinhos.nome.toLowerCase().includes(pesquisa.toLowerCase())).sort((a, b) =>{
    if(ordem == "menor_valor")
      return a.preco - b.preco
    if(ordem == "maior_valor")
      return b.preco - a.preco
    
    return a.jogoId - b.jogoId
  })
  console.log("teste abaixo:")
  console.log(jogosFiltrados)

  return (
    <section className={style.jogo}>
      <div className={style.titulos}>
        <h1>Catálogo de jogos</h1>
        <hr />
      </div>
      <div className={style.filtros}>
        <select name="ordem" id="" value={ordem} onChange={(e) => setOrdem(e.target.value)}>Filtrar
          <option value="todos">Todos</option>
          <option value="menor_valor">Menor preço</option>
          <option value="maior_valor">Maior preço</option>
        </select>
        <input type="text" name="Pesquisa" placeholder="Pesquisar" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
        <div className={style.botoes}>
          <button>Menor preço</button>
          <button>Categoria</button>
        </div>
      </div>
      <ul className={style.lista_jogo}>
        {jogosFiltrados.length > 0 ? (
          jogosFiltrados.map((jogo) => (
            <Cards
              key={jogo.jogoId}
              jogoId={jogo.jogoId}
              descricao={jogo.descricao}
              img={jogo.img}
              nome={jogo.nome}
              onDelete={confirmarExclusão}
              preco={jogo.preco}
              usuarioAutenticado={estaAutenticado}
            ></Cards>
          ))
        ) : (
          <p> está carregando </p>
        )}
      </ul>
      <nav className={style.navegacao}>
        <button className={style.navegacao_botao}>
          <img src="../svg/seta-esquerda.svg" alt="" />
        </button>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <button className={style.navegacao_botao}>
          <img src="../svg/seta-direita.svg" alt="" />
        </button>
      </nav>
    </section>
  );
};

export default Lista;
