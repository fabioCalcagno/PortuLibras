using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryUsuario
    {
        List<Usuario> ListarUsuario(Usuario usuario);
        int CadastrarUsuario(Usuario usuario);
        int AlterarUsuario(Usuario usuario);
        int ExcluirUsuario(int codigoUsuario);
    }
}
