using JogoApi.Dados.Interface;
using JogoApi.DTO;
using JogoApi.Util;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;

namespace JogoApi.Controllers
{
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
        [ActionName("RegistrarPontos")]
        public IActionResult BuscarPalavras([FromBody]PontosDTO pontos)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.RegistraPontos(pontos)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpGet]
        [ActionName("ListaJogos")]
        public IActionResult ListaJogos(int codigoUsuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.BuscaJogoUsuario(codigoUsuario)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpGet]
        [ActionName("BuscaJogo")]
        public IActionResult BuscaJogo(int codigoJogo)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.BuscaJogo(codigoJogo)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpGet]
        [ActionName("BuscaMelhores")]
        public IActionResult BuscaMelhores(int quantidade)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.BuscaMelhores(quantidade)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
