using JogoApi.Dados.Interface;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace JogoApi.Dados.DAO
{
    public class JogoApiDao : IJogoApiDao
    {
        private readonly IConnectionRepository repository;

        public JogoApiDao(IConnectionRepository repository)
        {
            this.repository = repository;
        }

        public void CriarUsuario(string query)
        {
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            repository.ExecutaTransacaoNonQuery(connection, query);
        }

        public List<UsuarioDTO> BuscaUsuario(string query)
        {
            List<UsuarioDTO> lstUsuarios = new List<UsuarioDTO>();
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            var dataReader = repository.ExecutaDataReader(connection, query);

            while(dataReader.Read())
            {
                UsuarioDTO usuario = new UsuarioDTO
                {
                    CodigoUsuario = (int)dataReader["ID_USUARIO"],
                    DataNascimento = dataReader["DT_NASC"].ToString(),
                    Email = dataReader["EMAIL"].ToString(),
                    Nome = dataReader["NOME"].ToString(),
                    Sobrenome = dataReader["SOBRENOME"].ToString(),
                    Telefone = dataReader["TELEFONE"].ToString(),
                    Username = dataReader["LOGIN"].ToString(),
                    Senha = dataReader["SENHA"].ToString()
                };

                lstUsuarios.Add(usuario);
            }

            return lstUsuarios;
        }

        public void EditaUsuario(string query)
        {
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            repository.ExecutaTransacaoNonQuery(connection, query);
        }

        public void RemoveUsuario(string query)
        {
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            repository.ExecutaTransacaoNonQuery(connection, query);
        }

        //public Retorno BuscaUsuario(UsuarioDTO usuario)
        //{


        //    return new Retorno()
        //    {
        //        Codigo = 200,
        //        Mensagem = "Sucesso",
        //        Data = @"""abc"":""dado"""
        //    };
        //}

        //internal Retorno BuscarPalavras()
        //{
        //    #region Mocado
        //    return new Retorno()
        //    {
        //        Codigo = 200,
        //        Mensagem = "Sucesso",
        //        Data = Palavras
        //    };
        //    #endregion
        //}

        //public bool VerificaExistencia(UsuarioDTO usuario)
        //{
        //    return true;
        //}
    }
}
