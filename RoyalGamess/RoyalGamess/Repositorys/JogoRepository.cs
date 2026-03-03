using RoyalGamess.Contexts;
using RoyalGamess.Domains;

namespace RoyalGamess.Repositorys
{
    public class JogoRepository
    {

        private readonly Royal_GamessContext _context;
        public JogoRepository(Royal_GamessContext context)
        {
            _context = context;
        }

        public List<Jogo> Listar()
        {
            return _context.Jogo.ToList();
        }

        public Jogo? ObterPorId(int id)
        {
            return _context.Jogo.FirstOrDefault(jogoId => jogoId.JogoId == id);
        }

        public Jogo? ObterPorNome(string nome)
        {
            return _context.Jogo.FirstOrDefault(jogoNome => jogoNome.Nome == nome);

        }

    }
}
