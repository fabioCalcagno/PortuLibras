using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using JogoApi.Util;
using Microsoft.AspNetCore.Authorization;

namespace JogoApi.Controllers
{
    [Authorize] 
    [Produces("aplication/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowSpecificOrigin")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService service;

        public UsuarioController(IUsuarioService service)
        {
            this.service = service;
        }

        [HttpPost]
        [ActionName("EditarUsuario")]
        public IActionResult EditarUsuario([FromBody]UsuarioDTO usuario)
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

        [HttpPost]
        [ActionName("ExcluirConta")]
        public IActionResult ExcluirConta([FromBody]UsuarioDTO usuario)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.ExcluirConta(usuario)), new MediaTypeHeaderValue("application/json").ToString());

            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
