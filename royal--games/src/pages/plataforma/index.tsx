import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import styles from './plataforma.module.css'
import { cadastrarPlataforma } from "../api/plataformaService"
import { Router, useRouter } from "next/router"
import { toast, ToastContainer } from "react-toastify"
import { verificarAutenticacao } from "@/utils/autenticacao"
import { useEffect, useState } from "react"
import {erro, notificacao} from '@/utils/toast'


const Plataforma = () =>{

    const router = useRouter()
    const id = router.query.id;
    let telaEditar = id ? true 
                    : false

    const [plataforma, setPlataforma] = useState<string>("")
    const [autenticado, setEstaAutenticado] = useState(false)


    async function postPlataforma(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        try{
            await cadastrarPlataforma(plataforma)
            notificacao("Cadastro de Plataforma realizado com sucesso!")

        }
        catch(errorTela: any){
            erro(errorTela.messsage);
        }
        
    }

    useEffect(() =>{
        if(!verificarAutenticacao())
            router.push("/home")

        else
            setEstaAutenticado(true)
    }, [])
    return(
        <>
        <Header/>
        <article className={styles.main}>
            <h1>Criar Plataforma</h1>
            <form action="" className={styles.formulario} onSubmit={postPlataforma} >
            <input type="text" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />
            <div>
            <button>Cancelar</button>
            <button>Salvar</button>
            </div>
            </form>
        </article>

        <Footer/>        
        </>
    )
}

export default Plataforma;