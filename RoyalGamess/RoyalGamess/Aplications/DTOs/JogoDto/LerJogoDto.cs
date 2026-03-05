namespace RoyalGamess.Aplications.DTOs.JogoDto
{
    public class LerJogoDto
    {

        public int JogoId { get; set; }

        public string Nome { get; set; } = null!;
        public string Descrição { get; set; } = null!;
        //public IFormFile Imagem { get; set; }
        public decimal Preço { get; set; }
        public bool? StatusJogo { get; set; }
        public List<int> plataformaIds { get; set; } = new();

        public List<string> Plataforma { get; set; } = new();

        public List<int> generoIds { get; set; } = new();
        public List<string> Genero { get; set; } = new();


        public int? classificacaoId { get; set; }
        public string? Classificação { get; set; } = null!;

        public int? UsuarioId { get; set; }
        public string? UsuarioNome { get; set; } 
        public string? UsuarioEmail { get; set; } 


        /*
         
        ﻿namespace RoyalGames.DTOs.Produto
{
    public class LerJogoDto
    {
        public int JogoID { get; set; }
        public string Nome { get; set; } = null!;
        public decimal Preco { get; set; }
        public string Descricao { get; set; } = null!;
        public bool? StatusJogo { get; set; }

        // generos
        public List<int> GeneroIds { get; set; } = new();
        public List<string> Generos { get; set; } = new();

        // plataformas
        public List<int> PlataformaIds { get; set; } = new();
        public List<string> Plataformas { get; set; } = new();

        // usuario que cadastrou 
        public int? UsuarioID { get; set; }
        public string? UsuarioNome { get; set; }
        public string? UsuarioEmail { get; set; }

        // classificacao 
        public int? ClassificacaoID { get; set; }
        public string? ClassificacaoNome { get; set; }
    }
}
         
         */

    }
}
