import Link from "next/link";
import style from "./header.module.css"


const Header = () => {


    return(
        <header className={style.header}>
            <img src="../svg/logo.svg" className={style.logo}alt="" />
            <nav>
                <Link href={"/jogo"}  className={style.href} >Cadastrar</Link>
                <Link href={"/login"} className={style.href} id={style.hreff}>Login</Link>
            </nav>
        </header>
    )
}

export default Header;