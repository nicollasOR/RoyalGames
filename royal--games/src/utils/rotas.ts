import { Router, useRouter } from "next/router"


const router = useRouter()
    const id = router.query.id;
    let telaEditar = id ? true 
                    : false
