using System.Data.SqlClient;

namespace JogoApi.Dados.Interface
{
    public interface IConexaoSql
    {
        SqlConnection CriaConexao();
        void FecharConexao(SqlConnection connection);
        void AbrirConexao(SqlConnection connection);
        void ExecutaNonQuery(SqlConnection connection, string query);
        SqlDataReader ExecutaDataReader(SqlConnection connection, string query);
        int ExecutaTransacaoScalar(SqlConnection connection, string query);
    }
}
