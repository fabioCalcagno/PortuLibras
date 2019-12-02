using JogoApi.Dados.Interface;
using JogoApi.DTO;
using JogoApi.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;

namespace JogoApi.Controllers
{
    [Authorize]
    [Produces("aplication/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowSpecificOrigin")]
    public class PontosController : Controller
    {
        private readonly IPontosService service;

        public PontosController(IPontosService service)
        {
            this.service = service;
        }

        [HttpPost]
        [ActionName("ListaJogos")]
        public IActionResult ListaJogos([FromBody]UsuarioDTO usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.BuscaJogoUsuario(usuario)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
