using Microsoft.EntityFrameworkCore;
using RoyalGamess.Contexts;
using RoyalGamess.Domains;
using RoyalGamess.Exceptions;
using RoyalGamess.Interfaces;

namespace RoyalGamess.Repositorys
{
    public class ClassificacaoIndicativa :  IClassificacaoIndicativa
    {

        private readonly Royal_GamessContext _context;

        public ClassificacaoIndicativa(Royal_GamessContext context)
        {
            _context = context;
        }

        public List<ClassificacaoIndicativa> Listar()
        {
            return _context.ClassificacaoIndicativa.ToList();
        }

        public ClassificacaoIndicativa ObterPorId(int id)
        {
            return _context.ClassificacaoIndicativa.FirstOrDefault(classificacaoId => classificacaoId.ClassificacaoIndicativaId == id);
        }

        public void Adicionar(ClassificacaoIndicativa classificacao)
        {
            _context.ClassificacaoIndicativa.Add(classificacao);
            _context.SaveChanges();
        }

        public void Atualizar(ClassificacaoIndicativa classificacao)
        {
            ClassificacaoIndicativa? classificacaoBanco = _context.ClassificacaoIndicativa.FirstOrDefault(classificacaoId => classificacaoId.ClassificacaoIndicativaId == classificacaoId.ClassificacaoIndicativaId);
            if(classificacaoBanco == null)
            {
                return;
            }

            classificacaoBanco.Nome = genero.Nome;

            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            ClassificacaoIndicativa classificacaoBanco = _context.ClassificacaoIndicativa.FirstOrDefault(classificacaoId => classificacaoId.ClassificacaoIndicativaId == id);

            if(classificacaoBanco == null)
            {
                return;
            }

            _context.ClassificacaoIndicativa.Remove(classificacaoBanco);
            _context.SaveChanges();
        }
    }

}
