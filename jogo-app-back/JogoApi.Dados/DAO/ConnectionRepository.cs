using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace JogoApi.Dados.DAO
{
    public class ConnectionRepository : IConnectionRepository
    {
        private readonly IConfiguration configuration;

        public ConnectionRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public SqlConnection CriaConexao()
        {
            string connectionString = configuration["myConnection"];

            if(connectionString == null)
            {
                connectionString = configuration["myConnection"];
            }

            return new SqlConnection(connectionString);
        }

        public void FecharConexao(SqlConnection connection)
        {
            connection.Close();
        }

        public void AbrirConexao(SqlConnection connection)
        {
            connection.Open();
        }

        public void ExecutaTransacaoNonQuery(SqlConnection connection, string query)
        {
            SqlTransaction transaction = connection.BeginTransaction();

            var command = connection.CreateCommand();

            command.Connection = connection;
            command.Transaction = transaction;
            try
            {
                command.CommandText = query;

                command.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                try
                {
                    transaction.Rollback();
                }
                catch (Exception ex2)
                {
                    throw new Exception(ex2.Message);
                }
                throw new Exception(ex.Message);
            }
            finally
            {
                FecharConexao(connection);
            }
        }

        public SqlDataReader ExecutaDataReader(SqlConnection connection, string query)
        {
            SqlTransaction transaction = connection.BeginTransaction();

            var command = connection.CreateCommand();

            command.Connection = connection;
            command.Transaction = transaction;
            command.CommandText = query;

            return command.ExecuteReader();
        }

        public int ExecutaTransacaoScalar(SqlConnection connection, string query)
        {
            SqlTransaction transaction = connection.BeginTransaction();

            var command = connection.CreateCommand();

            command.Connection = connection;
            command.Transaction = transaction;
            try
            {
                command.CommandText = query;

                string retorno = command.ExecuteScalar().ToString();

                transaction.Commit();

                return Convert.ToInt32(retorno);
            }
            catch (Exception ex)
            {
                try
                {
                    transaction.Rollback();
                }
                catch (Exception ex2)
                {
                    throw new Exception(ex2.Message);
                }
                throw new Exception(ex.Message);
            }
            finally
            {
                FecharConexao(connection);
            }
        }
    }
}
