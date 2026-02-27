using RoyalGamess.Contexts;
using RoyalGamess.Interfaces;
using RoyalGamess.Domains

namespace RoyalGamess.Repositorys
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly Royal_GamessContext _context;
        public UsuarioRepository(Royal_GamessContext context)
        {
            _context = context;
        }
        public List<Usuario> Listar()
        {
            return _context.Usuario.ToList();
        }
        public Usuario? ObterPorId(int id)
        {
            return _context.Usuario.Find(id);
        }
        public Usuario? ObterPorEmail(string email) {
            return _context.Usuario.FirstOrDefault(usuario => usuario.Email == email);
        }
        public bool NomeExiste(string nome)
        {
            return _context.Usuario.Any(usuario => usuario.Nome == nome);
        }
        public bool EmailExiste(string email) { 
            return _context.Usuario.Any(usuario => usuario.Email == email);
        }
        public void Adicionar (Usuario usuario)
        {   _context.Usuario.Add(usuario);
            _context.SaveChanges();
        }


}
}
