import { useEffect, useState } from "react";
import styles from "./cards.module.css";
import { formatarPreco } from "@/utils/formatacao";
import { verificarAutenticacao } from "@/utils/autenticacao";
import Link from "next/link";

type Jogo = {
  jogo: string;
  descricao: string;
  preco: number;
  img: string;
  jogoId: number;
  onDelete: (jogoId: number) => void;
  usuarioAutenticado: boolean;
};

const Cards = ({
  jogo,
  descricao,
  preco,
  img,
  jogoId,
  onDelete,
  usuarioAutenticado,
}: Jogo) => {
  return (
    <article className={styles.card}>
      <img src={img} alt="" />
      <span>{jogo}</span>
      <p>{formatarPreco(preco)}</p>
      <div className={styles.botoes}>
        
              {
        usuarioAutenticado ? (
          <>
                <Link href={"/jogo?id=" + jogoId}><button>Editar</button></Link>
                <button onClick={() => onDelete(jogoId)}>Excluir</button>
          </>
        )
        :(
          <>
          <Link href={"/detalhe_jogo/" + jogoId}><button>Detalhes</button></Link>
          </>
        )
      }
      </div>
    </article>
  );
};
{/*
  
  
  */}
{/* 
  
        <div className={style.botoes}>
        <span>{formatarPreco(preco)}</span>
        {usuarioAutenticado && (
          <>
            <Link href={"/historico/" + produtoId}>
              <button>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className={style.icone_botao}
                />
              </button>
            </Link>
            <Link href={"/produto?id=" + produtoId}>
              <button>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={style.icone_botao}
                />
              </button>
            </Link>
            <button onClick={() => onDelete(produtoId)}>
              <FontAwesomeIcon
                icon={faTrashCan}
                className={style.icone_botao}
              />
            </button>
          </>
        )}
      </div>
  
  */}
export default Cards;
