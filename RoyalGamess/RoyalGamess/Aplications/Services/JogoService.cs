using RoyalGamess.Aplications.Conversões;
using RoyalGamess.Aplications.DTOs.JogoDto;
using RoyalGamess.Domains;
using RoyalGamess.Exceptions;
using RoyalGamess.Interfaces;
using RoyalGamess.Aplications.Regras;

namespace RoyalGamess.Aplications.Services
{
    public class JogoService
    {

        private readonly IJogoRepository _repository;
        public JogoService(IJogoRepository repository)
        {
            _repository = repository;
        }


        public List<LerJogoDto> Listar()
        {
            List<Jogo> jogo = _repository.Listar();
            List<LerJogoDto> lerJogoDto = jogo.Select(JogoParaDTO.converterParaDTO).ToList();
            return lerJogoDto;
        }

        public LerJogoDto ObterPorId(int id)
        {
            Jogo jogo = _repository.ObterPorId(id);
            if (jogo == null)
                throw new DomainException("Jogo não encontrado");
            return JogoParaDTO.converterParaDTO(jogo);

        }

        public LerJogoDto ObterPorNome(string nome)
        {

            Jogo jogo = _repository.ObterPorNome(nome);
            if (jogo == null)
                throw new DomainException("Jogo não encontrado");
            return JogoParaDTO.converterParaDTO(jogo);
        }

        public LerJogoDto NomeJogoExiste(string nome, int jogoId)
        {
            Jogo jogo = _repository.ObterPorId(jogoId);
            Jogo jogoNome = _repository.ObterPorNome(nome);
            if (jogo == null && jogoNome == null)
                throw new DomainException("Jogo não encontrado");

            return JogoParaDTO.converterParaDTO(jogo);
        }

        private static void validarJogo(CriarJogoDto criarDto)
        {
            if (string.IsNullOrEmpty(criarDto.Nome))
                throw new DomainException("Nome de jogo não existe");
            if (criarDto.Preço <= 0)
                throw new DomainException("Preço do jogo deve ser maior que zero");
            if (criarDto.Descrição == null)
                throw new DomainException("Jogo deve ter descrição");
            if (criarDto.Imagem == null)
                throw new DomainException("Jogo deve ter uma imagem");
            if (criarDto.plataformaIds == null || criarDto.plataformaIds.Count == 0)
                throw new DomainException("Jogo deve ter ao menos um ID");

        }

        public byte[] ObterImagem(int id)
        {
            byte[] imagem = _repository.ObterImagem(id);
            if (imagem == null || imagem.Length == 0)
                throw new DomainException("Jogo já existe");

            return imagem;
        }

        public LerJogoDto Adicionar(int usuarioId, CriarJogoDto criarDto)
        {
            validarJogo(criarDto);

            if (_repository.NomeJogoExiste(criarDto.Nome))
                throw new DomainException("Jogo já existente");

            Jogo jogo = new Jogo
            {
                Nome = criarDto.Nome,
                Preco = criarDto.Preço,
                Descrição = criarDto.Descrição,
                Imagem = ImagemParaByte.ConverterImagem(criarDto.Imagem),
                StatusJogo = true,
                UsuarioIdFK = usuarioId,
                ClassificaçãoIdFK = criarDto.classificacaoId
            };

            _repository.Adicionar(jogo, criarDto.plataformaIds, criarDto.generoIds);

            return JogoParaDTO.converterParaDTO(jogo);

        }

        public LerJogoDto Atualizar(AtualizarJogoDto jogoDto, int id)
        {
            HorarioAlteracaoJogo.ValidarHorario();

            Jogo jogoBanco = _repository.ObterPorId(id);

            if (jogoBanco == null)
                throw new DomainException("Jogo não encontrado");

            if (_repository.NomeJogoExiste(jogoDto.Nome, jogoId: id))
                throw new DomainException("Jogo não encontrado");

            if (jogoDto.plataformaIds == null || jogoDto.plataformaIds.Count == 0)
                throw new DomainException("Jogo não possui plataforma");

            if (jogoDto.classificacaoId == 0)
                throw new DomainException("Jogo não possui classificação");

            if(jogoDto.generoIds == null || jogoDto.generoIds.Count == 0)
                throw new DomainException("Jogo não possui gênero");
            if (jogoDto.Preço < 0)
                throw new DomainException("Jogo tem que ter preço");

            jogoBanco.Nome = jogoDto.Nome;
            jogoBanco.Descrição = jogoDto.Descrição;
            jogoBanco.Preco = jogoDto.Preço;
            if (jogoBanco.Imagem != null && jogoBanco.Imagem.Length > 0)
            jogoBanco.Imagem = ImagemParaByte.ConverterImagem(jogoDto.Imagem);

            if (jogoBanco.StatusJogo.HasValue)
                jogoBanco.StatusJogo = jogoDto.StatusJogo;

            _repository.Atualizar(jogoBanco, jogoDto.plataformaIds, jogoDto.generoIds);
            return JogoParaDTO.converterParaDTO(jogoBanco);
        }


        public void Remover(int id)
        {
            Jogo jogo = _repository.ObterPorId(id);
            if(jogo == null)
                throw new DomainException("Usuário não encontrado");

            _repository.Remover(id);
        }
    }
}
