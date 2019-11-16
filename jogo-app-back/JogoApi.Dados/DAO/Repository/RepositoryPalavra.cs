using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace JogoApi.Dados.DAO.Repository
{
    public class RepositoryPalavra : IRepositoryPalavra
    {
        private readonly IConexaoSql conexao;

        public RepositoryPalavra(IConexaoSql conexao)
        {
            this.conexao = conexao;
        }

        public List<PalavraSinalDTO> BuscarPalavrasCorretas()
        {
            var lstPalavraSinal = new List<PalavraSinalDTO>();

            DataSet dataSet = new DataSet();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("PALAVRA_BUSCAR_CORRETA", connection);

            command.CommandType = CommandType.StoredProcedure;

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
                    lstPalavraSinal.Add(new PalavraSinalDTO()
                    {
                        ObjPalavra = new PalavraDTO()
                        {
                            CodigoPalavra = (int)reader["ID_PALAVRA"],
                            Palavra = reader["PALAVRA"].ToString(),
                            CodigoSinal = (int)reader["ID_SINAL"]
                        },
                        ObjSinal = new SinalDTO()
                        {
                            CodigoSinal = (int)reader["ID_SINAL"],
                            Diretorio = reader["DIRETORIO"].ToString()
                        }
                    });
                };


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
            return lstPalavraSinal;
        }

        public List<PalavraErrada> BuscarPalavrasErradas(int codigoPalavraCorreta)
        {
            DataSet dataSet = new DataSet();
            List<PalavraErrada> lstPalavraErrada = new List<PalavraErrada>();

            var connection = conexao.CriaConexao();
            conexao.AbrirConexao(connection);

            SqlCommand command = new SqlCommand("PALAVRA_BUSCAR_ERRADA", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id_Palavra", codigoPalavraCorreta);

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
                    lstPalavraErrada.Add(new PalavraErrada()
                    {
                        Palavra = reader["PALAVRA"].ToString()
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
            return lstPalavraErrada;
        }
    }
}
