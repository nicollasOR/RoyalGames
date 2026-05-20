import { api } from "./api";

type produtoPost = {
  nome: string;
  descricao: string;
  imagem: File | null;
  preco: string;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number[];
};

interface produtoListagem {
  nome: string;
  descricao: string;
  imagem: File | null;
  preco: string;
  plataformaIds: number[];
  generoIds: number[];
  classificacaoId: number[];
  statusJogo: boolean;
}

export class jogoDTO_typescripto {
  static toFormData(dados: produtoPost): FormData {
    const formData = new FormData();
    formData.append("nome", dados.nome);
    formData.append("preco", dados.preco);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    formData.append("classificacaoId", dados.classificacaoId.toString())
    // formData.append("classificacaoId", dados.classificacaoId.toString());
    // dados.classificacaoId.forEach((id) => {
    //   formData.append("classificacaoId", id.toString());
    // });

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
      imagem: `${api.defaults.baseURL}${jogo.imagem}`,
    };
  }
}

export async function cadastrarJogo(dados: produtoPost) {
  try {
    const formData = jogoDTO_typescripto.toFormData(dados);
    await api.post("Jogo", formData);
    console.log("foi fio");
  } catch (error: any) {
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
      imagem: `${api.defaults.baseURL}${jogo.imagem}`,
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
      imagem: `${api.defaults.baseURL}${response.data.imagem}`,
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
