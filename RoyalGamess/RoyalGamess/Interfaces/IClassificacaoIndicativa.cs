using RoyalGamess.Domains;

namespace RoyalGamess.Interfaces
{
    public interface IClassificacaoIndicativa
    {
        public string Nome {get;set;} = null!;
        ClassificacaoIndicativa ObterPorId(int id);
        public void Adicionar(ClassificacaoIndicativa classificacaoI);
        public void Atualizar(ClassificacaoIndicativa classificacaoI);
        public void Remover(ClassificacaoIndicativa classificacaoI);
    }
}
