using JogoApi.Dados.Service;
using JogoApi.DTO;
using JogoApi.DTO.Lesson;
using JogoApi.Util;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JogoApi.Controllers
{

    [Produces("aplication/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowSpecificOrigin")]

    public class LessonController
    {
        private readonly JogoApiService service;

        public LessonController(JogoApiService service)
        {
            this.service = service;
        }

        //[HttpGet]
        //[ActionName("Palavras")]
        //public Retorno BuscarPalavras()
        //{
        //    try
        //    {
        //        return service.BuscarPalavras();
        //    }
        //    catch (Exception ex)
        //    {
        //        return ExceptionHandler.HandleException(ex);
        //    }
        //}
    }
}
