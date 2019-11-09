using JogoApi.Dados.Interface;
using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace JogoApi.Dados.DAO
{
    public class TransacaoDao : ITransacaoDao
    {
        private readonly IConnectionRepository repository;

        public TransacaoDao(IConnectionRepository repository)
        {
            this.repository = repository;
        }

        public int RegistrarCadastro(string query)
        {
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            return repository.ExecutaTransacaoScalar(connection, query);
        }

        public List<Usuario> BuscaUsuario(string query)
        {
            List<Usuario> lstUsuarios = new List<Usuario>();
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            var dataReader = repository.ExecutaDataReader(connection, query);

            while(dataReader.Read())
            {
                Usuario usuario = new Usuario
                {
                    CodigoUsuario = (int)dataReader["ID_USUARIO"],
                    Email = dataReader["EMAIL"].ToString(),
                    Nome = dataReader["NOME"].ToString(),
                    Sobrenome = dataReader["SOBRENOME"].ToString(),
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

        public List<UsuarioPontosDTO> BuscaPontos(string query)
        {
            var lstRetorno = new List<UsuarioPontosDTO>();
            

            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            var dataReader = repository.ExecutaDataReader(connection, query);

            while (dataReader.Read())
            {
                var retorno = new UsuarioPontosDTO();
                var pontos = new PontosDTO()
                {
                    CodigoJogo = (int)dataReader["ID_JOGO"],
                    CodigoUsuario = (int)dataReader["ID_USUARIO"],
                    Pontos = (int)dataReader["SCORE"]
                };
                var usuario = new Usuario()
                {
                    CodigoUsuario = (int)dataReader["ID_USUARIO"],
                    //DataNascimento = dataReader["DT_NASC"].ToString(),
                    Email = dataReader["EMAIL"].ToString(),
                    Nome = dataReader["NOME"].ToString(),
                    Sobrenome = dataReader["SOBRENOME"].ToString(),
                    //Telefone = dataReader["TELEFONE"].ToString(),
                    Username = dataReader["LOGIN"].ToString()
                };
                retorno.UsuarioDTO = usuario;
                retorno.PontosDTO = pontos;
                lstRetorno.Add(retorno);

            }
            return lstRetorno;
        }

        public List<TokenEmail> BuscaTokenEmail(string queryTokenEmail)
        {
            List<TokenEmail> lstTokenEmail = new List<TokenEmail>();
            var connection = repository.CriaConexao();
            repository.AbrirConexao(connection);
            var dataReader = repository.ExecutaDataReader(connection, queryTokenEmail);

            while (dataReader.Read())
            {
                TokenEmail token = new TokenEmail
                {
                    CodigoUsuario = (int)dataReader["ID_USUARIO"],
                    CodigoToken = (int)dataReader["ID_TOKEN"],
                    DataValida = dataReader["DATAVALIDA"].ToString(),
                    Token = dataReader["TOKEN"].ToString()                    
                };

                lstTokenEmail.Add(token);
            }

            return lstTokenEmail;
        }
    }
}
