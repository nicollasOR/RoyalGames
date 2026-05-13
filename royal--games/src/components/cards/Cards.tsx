import styles from './cards.module.css';


const Cards = () =>{

    return(
        <article className={styles.card}>
            <img src="../img/png/teste.png" alt="" />
            <span>Minecraft</span>
            <p>R$ 70,00</p>
            <button>Detalhes</button>
        </article>
    )
}

export default Cards;