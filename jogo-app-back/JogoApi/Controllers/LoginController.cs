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
    public class LoginController : Controller
    {
        private readonly IUsuarioService service;

        public LoginController(IUsuarioService service)
        {
            this.service = service;
        }

        [HttpPost]
        [ActionName("CadastrarUsuario")]
        public IActionResult CadastrarUsuario([FromBody]Usuario usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.CriarUsuario(usuario)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpGet]
        [ActionName("ConfirmaConta")]
        public IActionResult ConfirmaConta(string email)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.ConfirmaConta(email)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpPost]
        [ActionName("Acessar")]
        public IActionResult Acessar([FromBody]Usuario usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.Acessar(usuario)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpPost]
        [ActionName("EditarUsuario")]
        public IActionResult EditarUsuario([FromBody]Usuario usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.EditaUsuario(usuario)), new MediaTypeHeaderValue("application/json").ToString());

            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
