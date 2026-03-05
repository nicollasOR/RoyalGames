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
            List<Jogo> jogos = _context.Jogo
                .Include(jogo => jogo.ClassificaçãoIdFK)
                .Include(jogo => jogo.UsuarioIdFK)
                .ToList();

            return jogos;
        }
        public Jogo ObterPorId(int id)
        {
            Jogo? jogoId = _context.Jogo
                .Include(jogo => jogo.ClassificaçãoIdFK)
                .Include(jogo => jogo.UsuarioIdFK).FirstOrDefault(jogo => jogo.JogoId == id);

            return jogoId;

        }

        public Jogo? ObterPorNome(string nome)
        {
            return _context.Jogo.FirstOrDefault(jogoNome => jogoNome.Nome == nome);

        }

        public byte[] ObterImg(int id)
        {
            var jogo = _context.Jogo.Where(jogo => jogo.JogoId == id).Select(jogo => jogo.Imagem).FirstOrDefault();
            return jogo;
        }

        public bool NomeJogoExiste(string nomeJogo, int? jogoId)
        {
            var jogo = _context.Jogo.AsQueryable();

            if (jogoId.HasValue)
                jogo = jogo.Where(jogo => jogo.JogoId != jogoId.Value);

            return jogo.Any(jogo => jogo.Nome == nomeJogo);
        }

        public void Adicionar(Jogo jogo, List<int> generoIds, List<int> plataformaIds)
        {
            List<Genero> generos = _context.Genero.Where(generoAux => generoIds.Contains(generoAux.GeneroId)).ToList();
            List<Plataforma> plataformas = _context.Plataforma.Where(plataformaAux => plataformaIds.Contains(plataformaAux.PlataformaId)).ToList();
            jogo.GeneroIdFK = generos;
            jogo.PlataformaIdFK = plataformas;

            _context.Jogo.Add(jogo);
        }

        public void Atualizar(Jogo jogo, List<int> generoIds, List<int> plataformaIds)
        {

            Jogo jogoBanco = _context.Jogo.Include(jogos => jogos.GeneroIdFK).Include(jogos => jogos.PlataformaIdFK)
                .FirstOrDefault(jogoAux => jogoAux.PlataformaIdFK == jogo.PlataformaIdFK && jogoAux.GeneroIdFK == jogo.GeneroIdFK);

            if (jogoBanco == null)
            {
                return;
            }

            jogoBanco.Nome = jogo.Nome;
            jogoBanco.Preco = jogo.Preco;
            jogoBanco.Descrição = jogo.Descrição;

            if (jogo.Imagem != null && jogo.Imagem.Length > 0)
                jogoBanco.Imagem = jogo.Imagem;

            if (jogo.StatusJogo.HasValue)
                jogoBanco.StatusJogo = jogo.StatusJogo;

            var jogosGenero = _context.Genero.Where(genero => generoIds.Contains(genero.GeneroId)).ToList();
            jogoBanco.GeneroIdFK.Clear();

            foreach (var generosVar in jogosGenero)
            {
                jogoBanco.GeneroIdFK.Add(generosVar);
            }

            var jogosPlataforma = _context.Plataforma.Where(classificacao => plataformaIds.Contains(classificacao.PlataformaId)).ToList();
            jogoBanco.PlataformaIdFK.Clear();

            foreach (var plataformaVar in jogosPlataforma)
            {
                jogoBanco.PlataformaIdFK.Add(plataformaVar);
            }

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
