using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace JogoApi.Dados.Service
{
    public class JogoApiService : IJogoApiService
    {
        private readonly IJogoApiDao jogoDao;

        public JogoApiService(IJogoApiDao jogoDao)
        {
            this.jogoDao = jogoDao;
        }

        public Retorno CriarUsuario(UsuarioDTO usuario)
        {
            if (VerificaUsuario(usuario))
            {
                return new Retorno() { Mensagem = "Usuário já existe", Codigo = 409 };
            }
            else
            {
                string query = QueryBuilder.CriarQueryUsuario(usuario);
                jogoDao.CriarUsuario(query);

                return new Retorno() { Mensagem = "Cadastro realizado com sucesso", Codigo = 200 };
            }
        }

        public bool VerificaUsuario(UsuarioDTO usuario)
        {
            if (ListaUsuario(usuario).Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Retorno EditaUsuario(UsuarioDTO usuario)
        {
            string query = QueryBuilder.CriarQueryEdicao(usuario);
            jogoDao.EditaUsuario(query);
            EditarTelefone(usuario);
            return new Retorno() { Mensagem = "Cadastro alterado com sucesso", Codigo = 200 };
        }

        public List<UsuarioDTO> ListaUsuario(UsuarioDTO usuario)
        {
            string query = QueryBuilder.CriarQueryBusca(usuario);
            return jogoDao.BuscaUsuario(query);
        }

        public void EditarTelefone(UsuarioDTO usuario)
        {
            string query = QueryBuilder.CriarQueryEdicaoTelefone(usuario);

            jogoDao.EditaUsuario(query);
        }

        public UsuarioDTO BuscaUsuario(UsuarioDTO usuario)
        {
            var lstUsuario = ListaUsuario(usuario);

            var teste = lstUsuario.FirstOrDefault(encontrado => encontrado.Senha == usuario.Senha && encontrado.Username == usuario.Username);
            return teste;
        }

        public Retorno RemoverUsuario(int codigo)
        {
            var query = QueryBuilder.CriarQueryDelete(codigo);
            jogoDao.RemoveUsuario(query);

            return new Retorno() { Codigo = 200, Mensagem = "Usuário removido com sucesso" };
        }        

        public Retorno Acessar(UsuarioDTO usuario)
        {
            var retorno = BuscaUsuario(usuario);

            if(retorno == null)
            {
                return new Retorno() { Codigo = 500, Mensagem = "Usuário não cadastrado" };
            }
            if (retorno.Senha == usuario.Senha && retorno.Username == usuario.Username)
            {
                return new Retorno() { Codigo = 200, Mensagem = "Login com sucesso" };
            }
            else
            {
                return new Retorno() { Codigo = 401, Mensagem = "Acesso negado" };
            }
        }
    }
}
