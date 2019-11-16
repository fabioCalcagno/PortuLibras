using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JogoApi.Dados.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ICriptografia criptografia;
        private readonly IEmailService emailService;
        private readonly IRepositoryUsuario repository;

        public UsuarioService(ICriptografia criptografia, IEmailService emailService, IRepositoryUsuario repository)
        {
            this.criptografia = criptografia;
            this.emailService = emailService;
            this.repository = repository;
        }

        public Retorno CriarUsuario(UsuarioDTO usuario)
        {
            //validacao dos campos
            if (String.IsNullOrEmpty(usuario.Nome.Trim())) return new Retorno() { Mensagem = "Nome não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Sobrenome.Trim())) return new Retorno() { Mensagem = "Sobrenome não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Email.Trim())) return new Retorno() { Mensagem = "Email não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Username.Trim())) return new Retorno() { Mensagem = "Username não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Senha.Trim())) return new Retorno() { Mensagem = "Senha não informada", Codigo = 400 };

            //criptografa senha
            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            //verificar se usuario existe
            string verificaUsuario = VerificaExisteUsuario(usuario);
            if (!String.IsNullOrEmpty(verificaUsuario))
            {
                return new Retorno() { Mensagem = verificaUsuario, Codigo = 409 };
            }

            //inserir usuario no banco
            int novoCodigo = repository.CadastrarUsuario(usuario);

            //busca usuario inserido
            var usuarioInserido = BuscarUsuario(new UsuarioDTO() { CodigoUsuario = novoCodigo });

            //enviar o email
            var retornoEmail = emailService.EnviaEmailConfirmacao(usuarioInserido);

            if (retornoEmail.Codigo == 500)
            {
                //exclui usuario sem email
                if (repository.ExcluirUsuario(usuarioInserido.CodigoUsuario) == 0)
                {
                    return new Retorno()
                    {
                        Codigo = 500,
                        Mensagem = "Falha ao enviar o email, favor entrar em contato com o suporte"
                    };
                }
                return retornoEmail;
            }

            return new Retorno() { Mensagem = "Cadastro realizado com sucesso, um e-mail foi enviado para confirmação da conta", Codigo = 200, Data = JsonConvert.SerializeObject(usuario).ToString() };
        }

        public UsuarioDTO BuscarUsuario(UsuarioDTO usuario)
        {
            var lstUsuario = ListarUsuario(usuario);

            var usuarioPorCodigo = lstUsuario.FirstOrDefault(recupera => recupera.CodigoUsuario == usuario.CodigoUsuario);

            return usuarioPorCodigo;
        }

        private string VerificaExisteUsuario(UsuarioDTO usuario)
        {
            //Verifica nome e sobrenome
            var buscaUsuario = new UsuarioDTO();
            buscaUsuario.CodigoUsuario = 0;
            buscaUsuario.Nome = usuario.Nome;
            buscaUsuario.Sobrenome = usuario.Sobrenome;
            buscaUsuario.Email = String.Empty;
            buscaUsuario.Username = String.Empty;
            buscaUsuario.Senha = String.Empty;
            if (ListarUsuario(buscaUsuario).Count > 0) return "Nome e Sobrenome já existem";

            //Verifica email
            buscaUsuario = new UsuarioDTO();
            buscaUsuario.Email = usuario.Email;
            buscaUsuario.CodigoUsuario = 0;
            buscaUsuario.Nome = String.Empty;
            buscaUsuario.Sobrenome = String.Empty;
            buscaUsuario.Username = String.Empty;
            buscaUsuario.Senha = String.Empty;
            if (ListarUsuario(buscaUsuario).Count > 0) return "E-mail já existe";

            //Verifica username
            buscaUsuario = new UsuarioDTO();
            buscaUsuario.Username = usuario.Username;
            buscaUsuario.Email = String.Empty;
            buscaUsuario.CodigoUsuario = 0;
            buscaUsuario.Nome = String.Empty;
            buscaUsuario.Sobrenome = String.Empty;
            buscaUsuario.Senha = String.Empty;
            if (ListarUsuario(buscaUsuario).Count > 0) return "Username já existe";

            return "";
        }

        public List<UsuarioDTO> ListarUsuario(UsuarioDTO usuario)
        {
            return repository.ListarUsuario(usuario);
        }

        public Retorno ConfirmaConta(string email)
        {
            var usuario = new UsuarioDTO() { Email = email };
            var lstUsuario = ListarUsuario(usuario);

            var usuarioLocalizado = lstUsuario.FirstOrDefault(encontrado => encontrado.Email == usuario.Email.ToUpper());

            if (usuarioLocalizado == null)
            {
                return new Retorno()
                {
                    Codigo = 500,
                    Mensagem = "E-mail não encontrado, favor entrar em contato com o suporte."
                };
            }

            if (usuarioLocalizado.Ativo == true)
            {
                return new Retorno()
                {
                    Codigo = 404,
                    Mensagem = "Usuário já está ativo."
                };
            }

            usuarioLocalizado.Ativo = true;

            if (repository.AlterarUsuario(usuarioLocalizado) == 0)
            {
                return new Retorno()
                {
                    Codigo = 500,
                    Mensagem = "Falha ao ativar a conta, entre em contato com o suporte"
                };
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Conta do usuário ativada",
                Data = JsonConvert.SerializeObject(usuario).ToString()
            };
        }

        public Retorno Acessar(UsuarioDTO usuario)
        {
            if (String.IsNullOrEmpty(usuario.Username.Trim()) || String.IsNullOrEmpty(usuario.Senha.Trim()))
            {
                return new Retorno()
                {
                    Mensagem = ("Usuário e senha precisam ser preenchidos"),
                    Codigo = 400,
                };
            }

            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            var lstUsuario = ListarUsuario(usuario);

            var usuarioLocalizado = lstUsuario.FirstOrDefault(encontrado => encontrado.Senha == usuario.Senha && encontrado.Username == usuario.Username.ToUpper());

            if (usuarioLocalizado == null)
            {
                return new Retorno()
                {
                    Codigo = 200,
                    Mensagem = "Usuário não cadastrado"
                };
            }

            if (usuarioLocalizado.Ativo == false)
            {
                return new Retorno()
                {
                    Codigo = 200,
                    Mensagem = "E-mail não confirmado"
                };
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Bem vindo!",
                Token = "FALTA"
            };
        }

        public Retorno EditaUsuario(UsuarioDTO usuario)
        {
            //validacao dos campos
            if (String.IsNullOrEmpty(usuario.Nome.Trim())) return new Retorno() { Mensagem = "Nome não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Sobrenome.Trim())) return new Retorno() { Mensagem = "Sobrenome não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Email.Trim())) return new Retorno() { Mensagem = "Email não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Username.Trim())) return new Retorno() { Mensagem = "Username não informado", Codigo = 400 };
            if (String.IsNullOrEmpty(usuario.Senha.Trim())) return new Retorno() { Mensagem = "Senha não informada", Codigo = 400 };

            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            if (repository.AlterarUsuario(usuario) == 0)
            {
                return new Retorno()
                {
                    Codigo = 500,
                    Mensagem = "Falha ao alterar os dados, por favor entre em contato com o suporte"
                    //, Token = "FALTA"
                };
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Cadastro alterado com sucesso",
                Data = JsonConvert.SerializeObject(usuario).ToString(),
                // Token = "FALTA"
            };
        }
    }
}
