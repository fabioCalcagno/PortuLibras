using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using System;
using System.Data;
using System.Data.SqlClient;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryPalavraRodada : IRepositoryPalavraRodada
    {
        private readonly IConexaoSql conexao;

        public RepositoryPalavraRodada(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public void GravarPalavraRodada(PalavraRodadaDTO palavraRodada)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("PALAVRARODADA_INSERIR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Palavra", palavraRodada.ObjPalavra.CodigoPalavra);
            command.Parameters.AddWithValue("@Id_Rodada", palavraRodada.ObjRodada.CodigoRodada);

            SqlTransaction transaction = connection.BeginTransaction();

            command.Connection = connection;
            command.Transaction = transaction;

            try
            {
                SqlDataAdapter dataAdapter = new SqlDataAdapter(command);

                command.ExecuteScalar().ToString();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                try
                {
                    transaction.Rollback();
                    throw new Exception(ex.Message);
                }
                catch (Exception ex2)
                {
                    throw new Exception(ex2.Message);
                }
            }

            finally
            {
                conexao.FecharConexao(connection);
            }
        }

        public NovaRodada NovaRodada(int codigoJogo, int numeroRodada)
        {
            DataSet dataSet = new DataSet();
            var novaRodada = new NovaRodada();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("PALAVRARODADA_NOVOJOGO", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Numero", numeroRodada);
            command.Parameters.AddWithValue("@Id_Jogo", codigoJogo);

            SqlTransaction transaction = connection.BeginTransaction();

            command.Connection = connection;
            command.Transaction = transaction;

            try
            {
                SqlDataAdapter dataAdapter = new SqlDataAdapter(command);

                dataAdapter.Fill(dataSet);

                DataTableReader reader = dataSet.Tables[0].CreateDataReader();

                while (reader.Read())
                {
                    novaRodada = new NovaRodada()
                    {
                        CodigoJogo = (int)reader["ID_JOGO"],
                        CodigoPalavraRodada = (int)reader["ID_PALAVRARODADA"],
                        CodigoRodada = (int)reader["ID_RODADA"],
                        CodigoPalavra = (int)reader["ID_PALAVRA"],
                        CodigoSinal = (int)reader["ID_SINAL"],
                        NumeroRodada = (int)reader["NUMERO"],
                        Diretorio = reader["DIRETORIO"].ToString(),
                        Palavra = reader["PALAVRA"].ToString(),
                        Score = (int)reader["SCORE"]
                    };
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                try
                {
                    transaction.Rollback();
                    throw new Exception(ex.Message);
                }
                catch (Exception ex2)
                {
                    throw new Exception(ex2.Message);
                }
            }

            finally
            {
                conexao.FecharConexao(connection);
            }

            return novaRodada;
        }
    }
}
