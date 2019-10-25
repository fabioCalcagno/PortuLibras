using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface ITransacaoDao
    {
        int RegistrarCadastro(string query);
        List<UsuarioDTO> BuscaUsuario(string query);
        List<UsuarioPontosDTO> BuscaPontos(string query);
        void EditaUsuario(string query);
        void RemoveUsuario(string query);
    }
}
