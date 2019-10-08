using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface IJogoApiService
    {
        Retorno CriarUsuario(UsuarioDTO usuario);
        Retorno EditaUsuario(UsuarioDTO usuario);
        List<UsuarioDTO> ListaUsuario(UsuarioDTO usuario);
        UsuarioDTO BuscaUsuario(UsuarioDTO usuario);
        Retorno RemoverUsuario(int codigo);
        Retorno Acessar(UsuarioDTO usuario);
    }
}
