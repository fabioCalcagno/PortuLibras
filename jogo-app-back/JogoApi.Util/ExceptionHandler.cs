using JogoApi.DTO;
using System;

namespace JogoApi.Util
{
    public class ExceptionHandler
    {
        public static Retorno HandleException(Exception ex)
        {
            string exceptionMessage = ex.Message;
            string innerException = ex.InnerException != null ? ex.InnerException.Message : "";

            return new Retorno() { Codigo = 500, Data = ex.StackTrace, Mensagem = exceptionMessage + innerException };
        }
    }
}
