import { api } from "./api";

export async function listarClassificacao(){
    try{
        const response = await api.get("ClassificacaoIndicativa")
        return response
    }
    catch(error: any){
        throw new Error(error.response.data)
    }
}

export async function cadastrarClassificacao(){
    try{
       const response = await api.post("ClassificacaoIndicativa") 
       
    }

    catch(error: any){
        throw new Error(error.response.data)
    }
}