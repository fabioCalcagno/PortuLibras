using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface IJogoApiDao
    {
        void CriarUsuario(string query);
        List<UsuarioDTO> BuscaUsuario(string query);
        void EditaUsuario(string query);
        void RemoveUsuario(string query);

        //bool BuscaUsuario(UsuarioDTO usuario);
    }
}
