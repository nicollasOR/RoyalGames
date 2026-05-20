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
      <button>{descricao}</button>
    </article>
  );
};

export default Cards;
