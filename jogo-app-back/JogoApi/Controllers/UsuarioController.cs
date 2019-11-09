using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using JogoApi.Util;

namespace JogoApi.Controllers
{
    [Produces("aplication/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowSpecificOrigin")]
    //[Authorization] //JWT Token
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService service;

        public UsuarioController(IUsuarioService service)
        {
            this.service = service;
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

        //[HttpPost]
        //[ActionName("BuscarUsuario")]
        //public IActionResult BuscarUsuario([FromBody]Usuario usuario)
        //{
        //    try
        //    {
        //        return Content(JsonConvert.SerializeObject(service.ProcuraUsuario(usuario)), new MediaTypeHeaderValue("application/json").ToString());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
        //    }
        //}
    }
}
