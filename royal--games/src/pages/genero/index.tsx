import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import styles from "./genero.module.css";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { verificarAutenticacao } from "@/utils/autenticacao";
import { cadastrarGenero } from "../api/generoService";
import { useEffect, useState } from "react";
import { erro, notificacao } from "@/utils/toast";

const Genero = () => {
  const [genero, setGenero] = useState<string>("");
  const [autenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();
  const id = router.query.id ? true : false;

  async function postGenero(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarGenero(genero);
      notificacao(`Cadastro de ${genero} realizado com sucesso`);
    } catch (error: any) {
      erro(error.message);
    }
  }

  return (
    <>
      <Header />
      <article className={styles.main}>
        <h1>Criar Gênero</h1>
        <form action="" className={styles.formulario} onSubmit={postGenero}>
          <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} />
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

export default Genero;
