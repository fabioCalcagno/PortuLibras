using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryUsuario : IRepositoryUsuario
    {
        private readonly IConexaoSql conexao;

        public RepositoryUsuario(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public string StringAtivo(bool? ativo)
        {
            if (ativo == null)
            {
                return "";
            }
            if (ativo == true)
            {
                return "1";
            }
            return "0";
        }

        public List<UsuarioDTO> ListarUsuario(UsuarioDTO usuario)
        {
            DataSet dataSet = new DataSet();
            List<UsuarioDTO> lstUsuario = new List<UsuarioDTO>();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("USUARIO_SELECIONAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Usuario", usuario.CodigoUsuario);
            command.Parameters.AddWithValue("@Nome", (!String.IsNullOrEmpty(usuario.Nome)) ? usuario.Nome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Sobrenome", (!String.IsNullOrEmpty(usuario.Sobrenome)) ? usuario.Sobrenome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Email", (!String.IsNullOrEmpty(usuario.Email)) ? usuario.Email.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Username", (!String.IsNullOrEmpty(usuario.Username)) ? usuario.Username.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Senha", (!String.IsNullOrEmpty(usuario.Senha)) ? usuario.Senha : "");
            command.Parameters.AddWithValue("@Ativo", StringAtivo(usuario.Ativo));

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
                    lstUsuario.Add(new UsuarioDTO()
                    {
                        CodigoUsuario = (int)reader["ID_USUARIO"],
                        Nome = reader["NOME"].ToString(),
                        Sobrenome = reader["SOBRENOME"].ToString(),
                        Email = reader["EMAIL"].ToString(),
                        Username = reader["USERNAME"].ToString(),
                        Senha = reader["SENHA"].ToString(),
                        Ativo = reader.GetBoolean(reader.GetOrdinal("ATIVO"))
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

            return lstUsuario;
        }

        public int CadastrarUsuario(UsuarioDTO usuario)
        {
            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("USUARIO_INSERIR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Nome", (!String.IsNullOrEmpty(usuario.Nome)) ? usuario.Nome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Sobrenome", (!String.IsNullOrEmpty(usuario.Sobrenome)) ? usuario.Sobrenome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Email", (!String.IsNullOrEmpty(usuario.Email)) ? usuario.Email.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Username", (!String.IsNullOrEmpty(usuario.Username)) ? usuario.Username.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Senha", (!String.IsNullOrEmpty(usuario.Senha)) ? usuario.Senha : "");
            command.Parameters.AddWithValue("@Ativo", StringAtivo(usuario.Ativo));

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

        public int AlterarUsuario(UsuarioDTO usuario)
        {
            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("USUARIO_ALTERAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Usuario", usuario.CodigoUsuario);
            command.Parameters.AddWithValue("@Nome", (!String.IsNullOrEmpty(usuario.Nome)) ? usuario.Nome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Sobrenome", (!String.IsNullOrEmpty(usuario.Sobrenome)) ? usuario.Sobrenome.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Email", (!String.IsNullOrEmpty(usuario.Email)) ? usuario.Email.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Username", (!String.IsNullOrEmpty(usuario.Username)) ? usuario.Username.Trim().ToUpper() : "");
            command.Parameters.AddWithValue("@Senha", (!String.IsNullOrEmpty(usuario.Senha)) ? usuario.Senha : "");
            command.Parameters.AddWithValue("@Ativo", StringAtivo(usuario.Ativo));

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

        public int ExcluirUsuario(int codigoUsuario)
        {
            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("USUARIO_DELETAR", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Usuario", codigoUsuario);

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


