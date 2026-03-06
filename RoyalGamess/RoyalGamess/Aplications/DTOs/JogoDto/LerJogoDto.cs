namespace RoyalGamess.Aplications.DTOs.JogoDto
{
    public class LerJogoDto
    {

        public int JogoId { get; set; }

        public string Nome { get; set; } = null!;
        public string Descrição { get; set; } = null!;
        public IFormFile Imagem { get; set; }
        public decimal Preço { get; set; }
        public bool StatusJogo { get; set; }
        // public bool? StatusJogo { get; set; }
        public List<int> plataformaIds { get; set; } = new();

        public List<string> Plataforma { get; set; } = new();

        public List<int> generoIds { get; set; } = new();
        public List<string> Genero { get; set; } = new();


        public int? classificacaoId { get; set; }
        public string? Classificação { get; set; } = null!; // analisar

        public int? UsuarioId { get; set; }
        public string? UsuarioNome { get; set; } 
        public string? UsuarioEmail { get; set; } 


 

    }
}
