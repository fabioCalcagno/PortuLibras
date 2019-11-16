using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryUsuario
    {
        List<UsuarioDTO> ListarUsuario(UsuarioDTO usuario);
        int CadastrarUsuario(UsuarioDTO usuario);
        int AlterarUsuario(UsuarioDTO usuario);
        int ExcluirUsuario(int codigoUsuario);
    }
}
