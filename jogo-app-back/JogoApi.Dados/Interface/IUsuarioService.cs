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
        //Usuario BuscaUsuario(Usuario usuario);
        //Retorno RemoverUsuario(int codigo);
        Retorno Acessar(Usuario usuario);
        //Retorno ProcuraUsuario(Usuario usuario);
        //Usuario BuscaUsuarioCodigo(int codigo);
        Retorno ConfirmaConta(string email);
    }
}
