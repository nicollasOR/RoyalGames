import style from './footer.module.css'

const Footer = () =>{




    return(
        <>
        <footer className={style.footer}>
            <img src="../svg/logo.svg" className={style.logo}alt="" />
            <ul className={style.contatos}>
                <li>royalgames@email.com</li>
                <li>(11)99999-9999</li>
                <li>@RoyalGames</li>
            </ul>
        </footer>
        </>
    )
}

export default Footer;