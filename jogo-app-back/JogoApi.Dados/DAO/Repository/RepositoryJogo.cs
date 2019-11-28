using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryJogo : IRepositoryJogo
    {
        private readonly IConexaoSql conexao;

        public RepositoryJogo(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public JogoDTO BuscarJogo(JogoDTO jogo)
        {
            var retorno = new JogoDTO();
            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("JOGO_SELECIONAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue ("@Id_Jogo", jogo.CodigoJogo);
            command.Parameters.AddWithValue("@Score", jogo.Score);
            command.Parameters.AddWithValue("@Id_Usuario", jogo.CodigoUsuario);

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
                    retorno = new JogoDTO()
                    {
                        CodigoJogo = (int)reader["ID_JOGO"],
                        CodigoUsuario = (int)reader["ID_USUARIO"],
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
            return retorno;
        }

        public List<JogoDTO> BuscarMelhoresPontos(int codigoUsuario)
        {
            DataSet dataSet = new DataSet();
            List<JogoDTO> lstJogos = new List<JogoDTO>();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("JOGO_BUSCARMELHORESPONTOS", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Usuario", codigoUsuario);

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
                    lstJogos.Add(new JogoDTO()
                    {
                        CodigoJogo = (int)reader["ID_JOGO"],
                        CodigoUsuario = (int)reader["ID_USUARIO"],
                        Score = (int)reader["SCORE"]
                    });
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
            return lstJogos;
        }

        public int CriarJogo(int codigoUsuario, int? score)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("JOGO_INSERIR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@ID_USUARIO", codigoUsuario);
            command.Parameters.AddWithValue("@SCORE", (score == null) ? 0 : score);

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
            finally
            {
                conexao.FecharConexao(connection);
            }
        }

        public int SalvarJogo(JogoDTO jogo)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("JOGO_ALTERAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@ID_JOGO", jogo.CodigoJogo);
            command.Parameters.AddWithValue("@ID_USUARIO", jogo.CodigoUsuario);
            command.Parameters.AddWithValue("@SCORE", jogo.Score);

            SqlTransaction transaction = connection.BeginTransaction();

            command.Connection = connection;
            command.Transaction = transaction;

            try
            {
                SqlDataAdapter dataAdapter = new SqlDataAdapter(command);

                string retorno = command.ExecuteNonQuery().ToString();

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
            finally
            {
                conexao.FecharConexao(connection);
            }
        }
    }
}
