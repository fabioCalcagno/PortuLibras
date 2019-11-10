using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface IUsuarioService
    {
        Retorno CriarUsuario(Usuario usuario);
        Usuario BuscarUsuario(Usuario usuario);
        Retorno EditaUsuario(Usuario usuario);
        List<Usuario> ListarUsuario(Usuario usuario);
        Retorno Acessar(Usuario usuario);
        Retorno ConfirmaConta(string email);
    }
}
