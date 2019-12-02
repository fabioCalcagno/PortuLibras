using System;
using System.Collections.Generic;
using System.Text;

namespace JogoApi.Dados.Interface
{
    public interface ICriptografia
    {
        string Descriptografar(string senhaCriptografada);
        string Criptografar(string senhaNormal);
    }
}
