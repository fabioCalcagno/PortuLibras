using JogoApi.DTO;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace JogoApi.Dados.Interface
{
    public interface IConnectionRepository
    {
        SqlConnection CriaConexao();
        void FecharConexao(SqlConnection connection);
        void AbrirConexao(SqlConnection connection);
        void ExecutaTransacaoNonQuery(SqlConnection connection, string query);
        SqlDataReader ExecutaDataReader(SqlConnection connection, string query);
    }
}
