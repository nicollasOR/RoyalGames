import { ReactNode } from 'react';
import styles from './botao.module.css'

type ButtonProps = {
    children: ReactNode,
    className: string,
    onClick?: () => void;
}

const Botoes = ({className, children}:ButtonProps)  => {
    

    return(
        <>
            <button>{children}</button>


        </>
    )
}

export default Botoes