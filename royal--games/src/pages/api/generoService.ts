import { api } from "./api";

export async function listarGenero(){
    try{
        const response = await api.get("Genero");
        return response;
    }

    catch(error: any){
        throw new Error(error.response.data)
    }
}

export async function cadastrarGenero(nome: string){

    try{
        const response = await api.post("Genero", {nome});
        return response;
    }

    catch(error: any){
        throw new Error(error.response.data)
    }
}
