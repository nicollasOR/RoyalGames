import styles from "./login.module.css";

const Login = () => {
  return (
      <main className={`${styles.main} layout`}>
        <img src="../img/png/mulher_login.png" id={styles.banner}alt="" />
        <aside className={styles.lado_direito}>
          <img src="../svg/logo.svg" alt="" />
          <form className={styles.logar}>
            <div className={styles.inputs}>
              <label htmlFor="Email">Email</label>
              <input type="text" name="Email"/>
            </div>
            <div className={styles.inputs}>
              <label htmlFor="Senha">Senha</label>
              <input type="text" name="Senha" />
            </div>

            <button>Entrar</button>
          </form>
        </aside>
      </main>
  );
};

export default Login;
