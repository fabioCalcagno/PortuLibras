using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using JogoApi.Util;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;

namespace JogoApi.Controllers
{
    [Authorize]
    [Produces("aplication/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowSpecificOrigin")]
    public class JogoController : Controller
    {
        private IJogoService service;
        public JogoController(IJogoService service)
        {
            this.service = service;
        }

        [HttpPost]
        [ActionName("NovoJogo")]
        public IActionResult NovoJogo([FromBody]UsuarioDTO usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.NovoJogo(usuario)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpPost]
        [ActionName("RegistrarPontos")]
        public IActionResult RegistrarPontos([FromBody]JogoDTO jogo)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.SalvarJogo(jogo)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
