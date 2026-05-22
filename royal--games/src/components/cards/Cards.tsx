import { useEffect, useState } from "react";
import styles from "./cards.module.css";
import { formatarPreco } from "@/utils/formatacao";
import { verificarAutenticacao } from "@/utils/autenticacao";
import Link from "next/link";

type Jogo = {
  nome: string;
  descricao: string;
  preco: number;
  img: string;
  jogoId: number;
  onDelete?: (jogoId: number) => void;
  usuarioAutenticado: boolean;
};

const Cards = ({
  nome,
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
      <span>{nome}</span>
      {/* <p>{formatarPreco(preco)}</p> */}
      <p>{preco}</p>
      <div className={styles.botoes}>
        {usuarioAutenticado ? (
          <>
            <Link href={"/jogo?id=" + jogoId}>
              <button>Editar</button>
            </Link>
            <button onClick={() => onDelete?.(jogoId)}>Excluir</button>
          </>
        ) : (
          <>
            <Link href={"/detalhe_jogo/" + jogoId}>
              <button>Detalhes</button>
            </Link>
          </>
        )}
      </div>
    </article>
  );
};
export default Cards;
