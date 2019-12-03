using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface IUsuarioService
    {
        Retorno CriarUsuario(UsuarioDTO usuario);
        UsuarioDTO BuscarUsuario(UsuarioDTO usuario);
        Retorno EditaUsuario(UsuarioDTO usuario);
        List<UsuarioDTO> ListarUsuario(UsuarioDTO usuario);
        Retorno Acessar(UsuarioDTO usuario);
        Retorno ConfirmaConta(string email);
        Retorno ExcluirConta(UsuarioDTO usuario);
        Retorno AlterarSenha(UsuarioDTO usuario);
    }
}
