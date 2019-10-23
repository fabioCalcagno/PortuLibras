using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface ITransacaoDao
    {
        void RegistrarCadastro(string query);
        List<UsuarioDTO> BuscaUsuario(string query);
        List<UsuarioPontosDTO> BuscaPontos(string query);
        void EditaUsuario(string query);
        void RemoveUsuario(string query);
    }
}
