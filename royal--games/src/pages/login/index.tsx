import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../api/authService";


const Login = () => {

  const [email, setEmail] = useState<string>("");    
  const [senha, setSenha] = useState<string>("");

  const routes = useRouter()
  const notificacao = (msg: string) => toast.success(msg);

  async function autenticacaoRolando(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault()
    try{
      await login(email, senha)
      notificacao("Login bem sucedido");
      setTimeout(() =>{
        routes.push("home/")
      }, 2500)
    }

    catch(error:any){
      alert(error.message);
    }
  }

  return (
      <main className={`${styles.main} layout`}>
        <img src="../img/png/mulher_login.png" id={styles.banner}alt="" />
        <aside className={styles.lado_direito}>
          <img src="../svg/logo.svg" alt="" />
          <form className={styles.logar} onSubmit={autenticacaoRolando}>
            <div className={styles.inputs}>
              <label htmlFor="Email">Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="Email"/>
            </div>
            <div className={styles.inputs}>
              <label htmlFor="Senha">Senha</label>
              <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} name="Senha" />
            </div>

            <button >Entrar</button>
          </form>
        </aside>
      </main>
  );
};

export default Login;
