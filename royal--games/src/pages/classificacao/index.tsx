import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import styles from "./classificacao.module.css";

import { Router, useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { verificarAutenticacao } from "@/utils/autenticacao";
import { useEffect, useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarClassificacao } from "../api/classificacaoService";

const Classificacao = () => {
  const router = useRouter();
  const id = router.query.id;
  let telaEditar = id ? true : false;

  const [classificacao, setClassificacao] = useState<string>("");
  const [autenticado, setEstaAutenticado] = useState(false);

  async function postClassificacao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarClassificacao(classificacao);
      notificacao(`Cadastro de ${classificacao} realizado com sucesso`);
    } catch (errorTela: any) {
      erro(errorTela.messsage);
    }
  }

  useEffect(() => {
    if (!verificarAutenticacao()) router.push("/home");
    else setEstaAutenticado(true);
  }, []);
  return (
    <>
      <Header />
      <article className={styles.main}>
        <h1>Criar Classificação</h1>
        <form
          action=""
          className={styles.formulario}
          onSubmit={postClassificacao}
        >
          <input
            type="text"
            value={classificacao}
            onChange={(e) => setClassificacao(e.target.value)}
          />
          <div className={styles.enviar_botoes}>
            <button>Cancelar</button>
            <button>Salvar</button>
          </div>
        </form>
      </article>

      <Footer />
    </>
  );
};

export default Classificacao;
