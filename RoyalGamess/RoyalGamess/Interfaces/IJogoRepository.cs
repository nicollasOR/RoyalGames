using RoyalGamess.Domains;

namespace RoyalGamess.Interfaces
{
    public interface IJogoRepository
    {

        List<Jogo> Listar();
        Jogo ObterPorId(int id);
        Jogo ObterPorNome(string nome);
        byte[] ObterImg(int id);
         bool NomeJogoExiste(string nomeJogo, int? jogoId = null  );

          void Adicionar(Jogo jogo);
          void Atualizar(Jogo jogo);
          void Remover(int id);

    }
}
