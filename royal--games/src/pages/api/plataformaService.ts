import { api } from "./api";
export async function cadastrarPlataforma(nome:string){
    try{
        await api.post("Plataforma", { nome })
    }
    catch(error: any)
    {
        throw new Error(error.response.data)
    }
}

export async function listarPlataforma(){
    try{
        const response = await api.get("Plataforma");
        return response;
    }

    catch(error: any){
        throw new Error(error.response.data)
    }
}

