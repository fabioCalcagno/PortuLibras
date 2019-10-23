using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace JogoApi.Dados.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ITransacaoDao objDao;

        public UsuarioService(ITransacaoDao objDao)
        {
            this.objDao = objDao;
        }

        public Retorno CriarUsuario(UsuarioDTO usuario)
        {
            if (VerificaUsuario(usuario))
            {
                return new Retorno() { Mensagem = "Usuário já existe", Codigo = 409 };
            }
            else
            {
                string query = Helper.CriarQueryUsuario(usuario);
                objDao.RegistrarCadastro(query);

                usuario.DataNascimento = Helper.AjustaDataNascimento(usuario.DataNascimento);

                return new Retorno() { Mensagem = "Cadastro realizado com sucesso", Codigo = 200, Data = JsonConvert.SerializeObject(usuario).ToString() };
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
            string query = Helper.CriarQueryEdicao(usuario);

            objDao.EditaUsuario(query);
            EditarTelefone(usuario);

            usuario.DataNascimento = Helper.AjustaDataNascimento(usuario.DataNascimento);

            return new Retorno() { Mensagem = "Cadastro alterado com sucesso", Codigo = 200, Data = JsonConvert.SerializeObject(usuario).ToString() };
        }

        public List<UsuarioDTO> ListaUsuario(UsuarioDTO usuario)
        {
            string query = Helper.CriarQueryBusca(usuario);

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

        public Retorno Acessar(UsuarioDTO usuario)
        {
            var retorno = BuscaUsuario(usuario);

            if (retorno == null)
            {
                return new Retorno() { Codigo = 500, Mensagem = "Usuário não cadastrado" };
            }
            if (retorno.Senha == usuario.Senha && retorno.Username == usuario.Username)
            {
                retorno.DataNascimento = Helper.AjustaDataNascimento(retorno.DataNascimento);

                return new Retorno()
                {
                    Codigo = 200,
                    Mensagem = "Login com sucesso",
                    Data = JsonConvert.SerializeObject(retorno).ToString()
                };
            }
            else
            {
                return new Retorno() { Codigo = 401, Mensagem = "Acesso negado" };
            }
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
