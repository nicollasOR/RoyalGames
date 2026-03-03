using RoyalGamess.Domains;

namespace RoyalGamess.Interfaces
{
    public interface IJogoRepository
    {

        public List<Jogo> Listar();
        Jogo ObterPorId(int id);
        Jogo ObterPorNome(string nome);
        public bool NomeJogoExiste(string nomeJogo);

        public void Adicionar(Jogo jogo);
        public void Atualizar(Jogo jogo);
        public void Remover(int id);

    }
}
