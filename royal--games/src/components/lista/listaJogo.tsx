import Cards from "../cards/Cards";
import style from "./listaJogo.module.css";
import { useEffect, useState } from "react";
import { formatarPreco } from "@/utils/formatacao";
import { verificarAutenticacao } from "@/utils/autenticacao";
import Link from "next/link";
import { excluirJogo, listarJogo } from "@/pages/api/jogoService";
import { erro, notificacao, ToastconfirmarExclusao } from "@/utils/toast";
import Jogo from "@/pages/jogo";
import ReactPaginate from "react-paginate";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Jogo = {
  jogoId: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemURL: string;
  onDelete: (jogoId: number) => void;
  usuarioAutenticado: boolean;
};

const Lista = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [ordem, setOrdem] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const [primeiroItem, setPrimeiroItem] = useState(0);

  const numItem = 6;
  const ultimoJogo = primeiroItem + numItem;
  const jogosAtuais = jogos.slice(primeiroItem, ultimoJogo);
  const paginas = Math.ceil(jogos.length / numItem);

  const alterarPagina = (event: any) => {
    const newOffSet = (event.selected * numItem) % jogos.length;

    setPrimeiroItem(newOffSet);
  };

  async function listar() {
    try {
      const lista = await listarJogo();
      setJogos(lista);
    } catch (error: any) {
      alert(error.message);
    }
  }
  async function confirmarExclusão(jogoId: number) {
    // ToastconfirmarExclusao(async () => {
    try {
      await excluirJogo(jogoId);
      alert("oi")
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
    // })
  }

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
    listar();
  }, []);

  const jogosFiltrados = jogos
    .filter((joguinhos) =>
      joguinhos.nome.toLowerCase().includes(pesquisa.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordem == "menor_valor") return a.preco - b.preco;
      if (ordem == "maior_valor") return b.preco - a.preco;

      return a.jogoId - b.jogoId;
    });
  console.log("teste abaixo:");
  console.log(jogosFiltrados);

  return (
    <section className={style.jogo}>
      <div className={style.titulos}>
        <h1>Catálogo de jogos</h1>
        <hr />
      </div>
      <div className={style.filtros}>
        <select
          name="ordem"
          id=""
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
        >
          Filtrar
          <option value="todos">Todos</option>
          <option value="menor_valor">Menor preço</option>
          <option value="maior_valor">Maior preço</option>
        </select>
        <input
          type="text"
          name="Pesquisa"
          placeholder="Pesquisar"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <div className={style.botoes}>
          <button>Menor preço</button>
          <button>Categoria</button>
        </div>
      </div>
      <ul className={style.lista_jogo}>
        {jogosFiltrados.length > 0 ? (
          jogosAtuais.map((jogo) => (
            <Cards
              key={jogo.jogoId}
              jogoId={jogo.jogoId}
              descricao={jogo.descricao}
              imagemURL={jogo.imagemURL}
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
        <ul>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
            previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
            onPageChange={alterarPagina}
            pageRangeDisplayed={paginas}
            pageCount={paginas}
            renderOnZeroPageCount={null}
            // containerClassName={styles.paginacao}
            // pageClassName={styles.pagina_item}
            // pageLinkClassName={styles.pagina_link}
            // previousClassName={styles.pagina_item}
            // nextClassName={styles.pagina_item}
            // activeClassName={styles.ativo}
          />
        </ul>
      </nav>
    </section>
  );
};

export default Lista;
