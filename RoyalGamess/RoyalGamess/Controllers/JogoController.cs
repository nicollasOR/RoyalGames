using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RoyalGamess.Aplications.DTOs.JogoDto;
using RoyalGamess.Aplications.Services;
using RoyalGamess.Exceptions;
using System.Security.Claims;

namespace RoyalGamess.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogoController : ControllerBase
    {

        private readonly JogoService _service;
        public JogoController(JogoService service)
        {
            _service = service;
        }

        private int ObterUsuarioIdLogado()
        {

            //busca no token/claims o valor armazenado como id do usuario
            string? idTexto = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //ClaimTypes.NameIdentifier geralmente guarda o ID do usuário no JWT

            if (string.IsNullOrEmpty(idTexto))
            {
                throw new DomainException("Usuário não encotnrado");
            }

            return int.Parse(idTexto);
        }

        [HttpGet]
        public ActionResult<List<LerJogoDto>> Listar()
        {
            List<LerJogoDto> jogos = _service.Listar();
            if (jogos == null)
                return NotFound(jogos);
            else
                return Ok(jogos);

        }

        [HttpGet("{id}")]
        public ActionResult<LerJogoDto> ObterPorId(int id)
        {
            try
            {
                LerJogoDto jogo = _service.ObterPorId(id);
                return Ok(jogo);
            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }


        }

        [HttpGet()]

        //[HttpPost]
        

    }
}
