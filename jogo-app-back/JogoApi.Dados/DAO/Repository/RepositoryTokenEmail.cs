using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryTokenEmail : IRepositoryTokenEmail
    {
        private readonly IConexaoSql conexao;

        public RepositoryTokenEmail(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public int GravarTokenEmail(TokenEmail tokenEmail)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("TOKENEMAIL_INSERIR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Token", tokenEmail.Token);
            command.Parameters.AddWithValue("@DataValida", tokenEmail.DataValida);
            command.Parameters.AddWithValue("@Id_Usuario", tokenEmail.CodigoUsuario);

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

        public int DeletarTokenEmail(int tokenInserido)
        {
            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("TOKENEMAIL_DELETAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_TokenEmail", tokenInserido);

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
        }

        public List<TokenEmail> BuscarToken(TokenEmail tokenEmail)
        {
            DataSet dataSet = new DataSet();
            List<TokenEmail> lstTokenEmail = new List<TokenEmail>();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("TOKENEMAIL_SELECIONAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Token", tokenEmail.CodigoToken);
            command.Parameters.AddWithValue("@Token", (!String.IsNullOrEmpty(tokenEmail.Token)) ? tokenEmail.Token.Trim() : "");
            command.Parameters.AddWithValue("@DataValida", (!String.IsNullOrEmpty(tokenEmail.DataValida)) ? tokenEmail.DataValida.Trim() : "");
            command.Parameters.AddWithValue("@Id_Usuario", tokenEmail.CodigoUsuario);

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
                    lstTokenEmail.Add(new TokenEmail()
                    {
                        CodigoToken = (int)reader["ID_TOKEN"],
                        Token = reader["TOKEN"].ToString(),
                        DataValida = reader["DATAVALIDA"].ToString(),
                        CodigoUsuario = (int)reader["ID_USUARIO"]
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
            return lstTokenEmail;
        }

        public int AlterarToken(TokenEmail tokenEmail)
        {
            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("TOKENEMAIL_ALTERAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Token", tokenEmail.CodigoToken);
            command.Parameters.AddWithValue("@Token", (!String.IsNullOrEmpty(tokenEmail.Token)) ? tokenEmail.Token : "");
            command.Parameters.AddWithValue("@DataValida", (!String.IsNullOrEmpty(tokenEmail.DataValida)) ? tokenEmail.DataValida : "");
            command.Parameters.AddWithValue("@Id_Usuario", tokenEmail.CodigoUsuario);

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
        }
    }
}
