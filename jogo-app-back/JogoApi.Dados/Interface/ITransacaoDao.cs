using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface
{
    public interface ITransacaoDao
    {
        int RegistrarCadastro(string query);
        List<Usuario> BuscaUsuario(string query);
        List<UsuarioPontosDTO> BuscaPontos(string query);
        void EditaUsuario(string query);
        void RemoveUsuario(string query);
        List<TokenEmail> BuscaTokenEmail(string queryTokenEmail);
    }
}
