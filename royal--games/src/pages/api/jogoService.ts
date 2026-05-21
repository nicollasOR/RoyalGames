import { api } from "./api";

type produtoPost = {
  nome: string;
  descricao: string;
  imagemURL: File | null;
  preco: string;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number[];

  plataforma: string[];
  genero: string[]
  classificacao: string
};

interface produtoListagem {
  nome: string;
  descricao: string;
  imagemURL: File | null;
  preco: string;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number;
  statusJogo: boolean;
}

export class jogoDTO_typescripto {
  static toFormData(dados: produtoPost): FormData {
    const formData = new FormData();
    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    if (dados.imagemURL) {
      formData.append("imagemURL", dados.imagemURL);
    }
    // formData.append("classificacaoId", dados.classificacaoId.toString())
        dados.classificacaoId.forEach((id) => {
      formData.append("classificacaoId", id.toString());
    });

    dados.plataformaIds.forEach((id) => {
      formData.append("plataformaIds", id.toString());
    });
    dados.generoIds.forEach((id) => {
      formData.append("generoIds", id.toString());
    });
    formData.append("descricao", dados.descricao);

    return formData;
  }

  static toImagemURL(jogo: produtoListagem) {
    return {
      ...jogo,
      imagemURL: `${api.defaults.baseURL}${jogo.imagemURL}`,
    };
  }
}

export async function cadastrarJogo(dados: produtoPost) {
  try {
    const formData = jogoDTO_typescripto.toFormData(dados);
    await api.post("Jogo", formData);
    console.log("foi fio");
  } catch (error: any) {
    console.log("deu erro");
    throw new Error(error.response.data);
  }
}

export async function listarJogo() {
  try {
    const response = await api.get("Jogo");
    const jogosAtivos = response.data.filter(
      (jogo: produtoListagem) => jogo.statusJogo === true,
    );

    const jogoLink = jogosAtivos.map((jogo: produtoListagem) => ({
      ...jogo,
      imagemURL: `${api.defaults.baseURL}${jogo.imagemURL}`,
    }));

    return jogoLink;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarJogoPorId(id: number) {
  try {
    const response = await api.get("Jogo/" + id);
    const jogoLink = {
      ...response.data,
      imagemURL: `${api.defaults.baseURL}${response.data.imagem}`,
    };
    return jogoLink;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function excluirJogo(jogoId: number) {
  try {
    await api.delete("Jogo/" + jogoId);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function editarJogo(jogoId: number, dados: produtoPost) {
    try {
      const formDatas = jogoDTO_typescripto.toFormData(dados);
        await api.put("Jogo/" + jogoId, formDatas)
    }
    catch (error: any) {
    throw new Error(error.response.data);
  }
    
}
