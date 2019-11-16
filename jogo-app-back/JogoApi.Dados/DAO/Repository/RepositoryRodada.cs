using JogoApi.Dados.Interface;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryRodada : IRepositoryRodada
    {
        private readonly IConexaoSql conexao;

        public RepositoryRodada(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public int SalvarRodada(RodadaDTO rodada)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("RODADA_INSERIR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Numero", rodada.Numero);
            command.Parameters.AddWithValue("@Id_Jogo", rodada.CodigoJogo);

            SqlTransaction transaction = connection.BeginTransaction();

            command.Connection = connection;
            command.Transaction = transaction;

            try
            {
                SqlDataAdapter dataAdapter = new SqlDataAdapter(command);

                string retorno = command.ExecuteScalar().ToString();

                transaction.Commit();

                return Convert.ToInt32(retorno);
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
        }
    }
}
