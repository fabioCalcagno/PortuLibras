using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JogoApi.Dados.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ITransacaoDao objDao;
        private readonly ICriptografia criptografia;

        public UsuarioService(ITransacaoDao objDao, ICriptografia criptografia)
        {
            this.objDao = objDao;
            this.criptografia = criptografia;
        }

        public Retorno Acessar(UsuarioDTO usuario)
        {
            if (String.IsNullOrEmpty(usuario.Username) || String.IsNullOrEmpty(usuario.Senha))
            {
                return new Retorno()
                {
                    Mensagem = ("Usuário e senha precisam ser preenchidos"),
                    Codigo = 400,
                };

            }

            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            var buscaUsuario = BuscaUsuario(usuario);

            if (buscaUsuario == null)
            {
                return new Retorno()
                {
                    Codigo = 401,
                    Mensagem = ("Usuário não encontrado")
                };
            }

            buscaUsuario.Senha = criptografia.Descriptografar(buscaUsuario.Senha);

            if (buscaUsuario.Senha == usuario.Senha && buscaUsuario.Username == usuario.Username)
            {
                buscaUsuario.DataNascimento = Helper.AjustaDataNascimento(buscaUsuario.DataNascimento);
                return new Retorno()
                {
                    Codigo = 200,
                    Data = JsonConvert.SerializeObject(buscaUsuario),
                    Mensagem = "Usuário encontrado"
                };
            }
            else
            {
                return new Retorno()
                {
                    Codigo = 403,
                    Mensagem = ("Usuário não cadastrado")
                };
            }
        }

        public Retorno CriarUsuario(UsuarioDTO usuario)
        {
            if (!String.IsNullOrEmpty(usuario.Senha))
            {
                usuario.Senha = criptografia.Criptografar(usuario.Senha);
            }
            else
            {
                return new Retorno() { Mensagem = "Senha não digitada", Codigo = 400 };
            }

            if (VerificaUsuario(usuario))
            {
                return new Retorno() { Mensagem = "Usuário já existe", Codigo = 409 };
            }
            else
            {

                string query = Helper.CriarQueryUsuario(usuario);

                var codigoUsuario = objDao.RegistrarCadastro(query);

                var retorno = BuscaUsuarioCodigo(codigoUsuario);

                usuario.DataNascimento = Helper.AjustaDataNascimento(usuario.DataNascimento);

                return new Retorno() { Mensagem = "Cadastro realizado com sucesso", Codigo = 200, Data = JsonConvert.SerializeObject(retorno).ToString() };
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
            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            string query = Helper.CriarQueryEdicao(usuario);

            objDao.EditaUsuario(query);
            EditarTelefone(usuario);

            usuario.DataNascimento = Helper.AjustaDataNascimento(usuario.DataNascimento);

            return new Retorno() { Mensagem = "Cadastro alterado com sucesso", Codigo = 200, Data = JsonConvert.SerializeObject(usuario).ToString() };
        }

        public List<UsuarioDTO> ListaUsuario(UsuarioDTO usuario)
        {
            if (!String.IsNullOrEmpty(usuario.DataNascimento))
            {
                usuario.DataNascimento = Helper.DataNascimentoBanco(usuario.DataNascimento);
            }
            string query = Helper.CriarQueryBuscaUsuario(usuario);

            var lstRetorno = objDao.BuscaUsuario(query);

            foreach (var retorno in lstRetorno)
            {
                retorno.DataNascimento = Helper.AjustaDataNascimento(retorno.DataNascimento);
            }
            return lstRetorno;
        }

        public void EditarTelefone(UsuarioDTO usuario)
        {
            string query = Helper.CriarQueryEdicaoTelefone(usuario);

            objDao.EditaUsuario(query);
        }

        public UsuarioDTO BuscaUsuarioCodigo(int codigo)
        {
            var query = Helper.CriarQueryBuscaUsuario(new UsuarioDTO() { CodigoUsuario = codigo });
            var retorno = objDao.BuscaUsuario(query);

            return retorno.First(x => x.CodigoUsuario == codigo);
        }

        public UsuarioDTO BuscaUsuario(UsuarioDTO usuario)
        {
            var lstUsuario = ListaUsuario(usuario);

            foreach (var retorno in lstUsuario)
            {
                retorno.DataNascimento = Helper.AjustaDataNascimento(retorno.DataNascimento);
            }

            return lstUsuario.FirstOrDefault(encontrado => encontrado.Senha == usuario.Senha && encontrado.Username == usuario.Username);
        }

        public Retorno RemoverUsuario(int codigo)
        {
            var query = Helper.CriarQueryDelete(codigo);
            objDao.RemoveUsuario(query);

            return new Retorno() { Codigo = 200, Mensagem = "Usuário removido com sucesso" };
        }

        public Retorno ProcuraUsuario(UsuarioDTO usuario)
        {
            var lstUsuario = ListaUsuario(usuario);

            foreach (var retorno in lstUsuario)
            {
                retorno.DataNascimento = Helper.AjustaDataNascimento(retorno.DataNascimento);
            }

            if (lstUsuario.Count == 1)
            {
                return new Retorno() { Codigo = 200, Mensagem = "Usário econtrado", Data = JsonConvert.SerializeObject(lstUsuario).ToString() };
            }

            if (lstUsuario.Count > 1)
            {
                return new Retorno() { Codigo = 401, Mensagem = "Usuários duplicado", Data = JsonConvert.SerializeObject(lstUsuario).ToString() };
            }

            return new Retorno() { Codigo = 401, Mensagem = "Usuário não existe" };
        }
    }
}
