using Microsoft.EntityFrameworkCore;
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
            List<Jogo> jogo = _context.Jogo.Include(jogoG => jogoG.GeneroIdFK)

        }
        public Jogo? ObterPorId(int id)
        {
            return _context.Jogo.FirstOrDefault(jogoId => jogoId.JogoId == id);
        }

        public Jogo? ObterPorNome(string nome)
        {
            return _context.Jogo.FirstOrDefault(jogoNome => jogoNome.Nome == nome);

        }

        public bool NomeJogoExiste(string nomeJogo, int? jogoId)
        {
            return _context.Jogo.Any(jogo => jogo.Nome == nomeJogo);
        }

        public void Adicionar(Jogo jogo)
        {
            _context.Jogo.Add(jogo);
            _context.SaveChanges();
        }

        public void Atualizar(Jogo jogo)
        {
            Jogo? jogoBanco = _context.Jogo.FirstOrDefault(jogoI => jogoI.JogoId == jogo.JogoId);
            if(jogo == null)
            {
                return;
            }

            jogoBanco.Nome = jogo.Nome;
            _context.Jogo.Update(jogoBanco);
            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            Jogo? jogoBanco = _context.Jogo.FirstOrDefault(jogoI => jogoI.JogoId == id);
            if (jogoBanco == null)
                return;

            _context.Jogo.Remove(jogoBanco);
            _context.SaveChanges();
        }

    }
}
