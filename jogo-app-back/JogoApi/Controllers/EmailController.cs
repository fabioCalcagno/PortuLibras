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
    public class EmailController : Controller
    {
        private readonly IEmailService service;

        public EmailController(IEmailService service)
        {
            this.service = service;
        }

        [HttpGet]
        [ActionName("EnviaResetSenha")]
        public IActionResult EnviaResetSenha(string email)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.EnviaResetSenha(email)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }

        [HttpPost]
        [ActionName("ValidaTokenEmail")]
        public IActionResult ValidaTokenEmail([FromBody]ResetSenha resetSenha)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(service.ValidaTokenEmail(resetSenha)), new MediaTypeHeaderValue("application/json").ToString());
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject(ExceptionHandler.HandleException(ex)), new MediaTypeHeaderValue("application/json").ToString());
            }
        }
    }
}
