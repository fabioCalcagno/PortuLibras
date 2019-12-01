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
        private readonly IAuthTokenService authService;

        public UsuarioService(ICriptografia criptografia, IEmailService emailService, IRepositoryUsuario repository, IAuthTokenService authService)
        {
            this.criptografia = criptografia;
            this.emailService = emailService;
            this.repository = repository;
            this.authService = authService;
        }

        public Retorno CriarUsuario(UsuarioDTO usuario)
        {
            //validacao dos campos
            string verificaCampos = ValidaCampos(usuario);
            if (!String.IsNullOrEmpty(verificaCampos))
            {
                return new Retorno() { Mensagem = verificaCampos, Codigo = 400 };
            }

            //criptografa senha
            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            //verificar se usuario existe
            string verificaUsuario = VerificaExisteUsuario(usuario);
            if (!String.IsNullOrEmpty(verificaUsuario))
            {
                return new Retorno() { Mensagem = verificaUsuario, Codigo = 400 };
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

            //adiciona token
            string token = authService.GeraTokenUsuario(usuarioInserido);
            usuarioInserido.Senha = null;

            return new Retorno()
            {
                Mensagem = "Cadastro realizado com sucesso, um e-mail foi enviado para confirmação da conta",
                Codigo = 200,
                Data = JsonConvert.SerializeObject(usuarioInserido).ToString(),
                Token = token
            };
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
            usuario.Senha = null;
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
                Data = JsonConvert.SerializeObject(usuarioLocalizado).ToString()
            };
        }

        public Retorno Acessar(UsuarioDTO usuario)
        {
            string mensagemValida = ValidaRetorno(usuario);
            if (!String.IsNullOrEmpty(mensagemValida))
            {
                return new Retorno()
                {
                    Mensagem = mensagemValida,
                    Codigo = 400,
                };
            }

            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            var lstUsuario = ListarUsuario(usuario);

            if (lstUsuario.Count == 0)
            {
                return new Retorno()
                {
                    Codigo = 400,
                    Mensagem = "Preencher com usuário válido"
                };
            }

            var usuarioLocalizado = lstUsuario.FirstOrDefault(encontrado => encontrado.Senha == usuario.Senha && encontrado.Username == usuario.Username.ToUpper());

            if (usuarioLocalizado == null)
            {
                return new Retorno()
                {
                    Codigo = 400,
                    Mensagem = "Preencher senha igual exemplo (Senha123)"
                };
            }

            string token = authService.GeraTokenUsuario(usuarioLocalizado);

            if (usuarioLocalizado.Ativo == false)
            {
                return new Retorno()
                {
                    Codigo = 200,
                    Mensagem = "E-mail não confirmado",
                    Token = token
                };
            }

            usuarioLocalizado.Senha = null;
            return new Retorno()
            {
                Data = JsonConvert.SerializeObject(usuarioLocalizado).ToString(),
                Codigo = 200,
                Mensagem = "Bem vindo!",
                Token = token
            };
        }

        private string ValidaRetorno(UsuarioDTO usuario)
        {
            if (String.IsNullOrEmpty(usuario.Username.Trim()) && String.IsNullOrEmpty(usuario.Senha.Trim()))
            {
                return "Preencher campo usuário + campo senha";
            }
            
            if (String.IsNullOrEmpty(usuario.Username.Trim()))
            {
                return "Preencher campo usuário";
            }

            if (String.IsNullOrEmpty(usuario.Senha.Trim()))
            {
                return "Preencher campo senha";
            }

            return "";
        }

        public Retorno EditaUsuario(UsuarioDTO usuario)
        {
            //validacao dos campos
            string verificaCampos = ValidaCampos(usuario);
            if (!String.IsNullOrEmpty(verificaCampos))
            {
                return new Retorno() { Mensagem = verificaCampos, Codigo = 400 };
            }

            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            if (repository.AlterarUsuario(usuario) == 0)
            {
                return new Retorno()
                {
                    Codigo = 500,
                    Mensagem = "Falha ao alterar os dados, por favor entre em contato com o suporte"
                };
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Cadastro alterado com sucesso",
                Data = JsonConvert.SerializeObject(usuario).ToString(),
            };
        }

        public Retorno ExcluirConta(UsuarioDTO usuario)
        {
            repository.ExcluirUsuario(usuario.CodigoUsuario);


            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Usuário excluído"
            };
        }

        private string ValidaCampos(UsuarioDTO usuario)
        {
            if (String.IsNullOrEmpty(usuario.Nome.Trim())) return "Nome não informado";
            if (String.IsNullOrEmpty(usuario.Sobrenome.Trim())) return "Sobrenome não informado";
            if (String.IsNullOrEmpty(usuario.Email.Trim())) return "Email não informado";
            if (String.IsNullOrEmpty(usuario.Username.Trim())) return "Username não informado";
            if (String.IsNullOrEmpty(usuario.Senha.Trim())) return "Senha não informada";
            return "";
        }
    }
}
