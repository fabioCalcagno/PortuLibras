using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using JogoApi.Util;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace JogoApi.Dados.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;
        private readonly ITransacaoDao objDao;
        private readonly ICriptografia criptografia;
        private readonly IRepositoryUsuario repositoryUsuario;
        private readonly IRepositoryTokenEmail repositoryTokenEmail;

        public EmailService(IConfiguration configuration, ITransacaoDao objDao, ICriptografia criptografia, IRepositoryUsuario repositoryUsuario, IRepositoryTokenEmail repositoryTokenEmail)
        {
            this.criptografia = criptografia;
            this.configuration = configuration;
            this.objDao = objDao;
            this.repositoryUsuario = repositoryUsuario;
            this.repositoryTokenEmail = repositoryTokenEmail;
        }

        public Retorno EnviaResetSenha(string email)
        {
            //buscar usuario por email
            var usuario = new Usuario()
            {
                Email = email
            };

            //busca usuario
            var usuarioEncontrado = BuscaUsuario(usuario); 

            //validar se email existe
            if (usuarioEncontrado == null)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Email não encontrado." };
            }

            var tokenEmail = new TokenEmail()
            {
                CodigoUsuario = usuarioEncontrado.CodigoUsuario,
            };

            //busca token no banco
            tokenEmail = BuscarTokenEmail(tokenEmail);

            //gera novo token
            string token = HelperEmail.GeraCodigo();

            //verificar se usuario ja possui token
            if (VerificaTokenExiste(tokenEmail))
            {
                //recebe novo token de reset de senha
                tokenEmail.Token = token;

                //gera data de expiracao adicionando 2 horas da atual
                tokenEmail.DataValida = DateTime.Now.AddHours(2).ToString("yyyy-MM-dd HH:mm:ss");

                //alterar novo token
                if (repositoryTokenEmail.AlterarToken(tokenEmail) == 0)
                {
                    return new Retorno()
                    {
                        Codigo = 500,
                        Mensagem = "Falha ao gerar novo token, por favor entre em contato com o suporte"
                    };
                }

                //busca novo token alterado
                tokenEmail = BuscarTokenEmail(new TokenEmail() { CodigoUsuario = tokenEmail.CodigoUsuario });

                //envia email com novo token e retorna mensagem
                return MontaEmailSenha(tokenEmail, usuarioEncontrado.Email);
            }

            //gera token de reset de senha
            tokenEmail.Token = token;

            //gera data de expiracao adicionando 2 horas da atual
            tokenEmail.DataValida = DateTime.Now.AddHours(2).ToString("yyyy-MM-dd HH:mm:ss");

            //grava o token no banco
            int tokenInserido = repositoryTokenEmail.GravarTokenEmail(tokenEmail);

            //envia email e retorna mensagem
            var retorno = MontaEmailSenha(tokenEmail, usuarioEncontrado.Email);

            //caso erro exclui token
            if (retorno.Codigo == 500)
            {
                repositoryTokenEmail.DeletarTokenEmail(tokenInserido);
                return new Retorno()
                {
                    Codigo = 500,
                    Mensagem = "Falha ao criar token"
                };
            }
            return retorno;
        }

        private Usuario BuscaUsuario(Usuario usuario)
        {
            var lstUsuario = repositoryUsuario.ListarUsuario(usuario);
            return lstUsuario.FirstOrDefault(encontrado => encontrado.Email == usuario.Email.ToUpper());
        }

        private bool VerificaTokenExiste(TokenEmail tokenEmail)
        {
            if (tokenEmail == null) return false; 
            return true;
        }

        private TokenEmail BuscarTokenEmail(TokenEmail tokenEmail)
        {
            var lstTokenEmail = repositoryTokenEmail.BuscarToken(tokenEmail);

            return lstTokenEmail.FirstOrDefault(encontrado => encontrado.CodigoUsuario == tokenEmail.CodigoUsuario);
        }

        private Retorno MontaEmailSenha(TokenEmail tokenEmail, string email)
        {
            //endereco de email do PoruLibras
            string endereco = configuration["EnderecoEmail"];

            //montar assunto
            string assunto = HelperEmail.AssuntoSenha();

            //montar body
            string body = HelperEmail.BodySenha(tokenEmail.Token, endereco);

            //efetua o envio do email
            return EnviaEmail(email, body, assunto);           
        }

        public Retorno EnviaEmail(string email, string body, string assunto)
        {
            string portuLibras = configuration["EnderecoEmail"];

            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(portuLibras, configuration["SenhaEmail"]),
                    EnableSsl = true
                };

                MailMessage mailMessage = new MailMessage
                {
                    IsBodyHtml = true,
                    From = new MailAddress(portuLibras),
                    Body = body,
                    Subject = assunto
                };

                mailMessage.To.Add(email);

                client.Send(mailMessage);

                return new Retorno() { Codigo = 200, Mensagem = "E-mail enviado, caso não o ache em sua caixa de entrada procure no lixo eletrônico." };
            }
            catch (Exception ex)
            {
                return new Retorno() { Codigo = 500, Mensagem = "Tente novamente, falha ao enviar o e-mail: " + ex.Message };
            }
        }

        public Retorno ValidaTokenEmail(string email, string token)
        {
            //busca usuario por email
            var usuario = BuscaUsuario(new Usuario() { Email = email });

            //verifica se email existe
            if (usuario == null)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Email não encontrado." };
            }

            //busca token do usuario
            var tokenEmail = BuscarTokenEmail(new TokenEmail() { CodigoUsuario = usuario.CodigoUsuario });

            //verifica existencia do token
            if (tokenEmail == null)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Falha ao recuperar o código de reset de senha, por favor gere o código de reset de senha novamente" };
            }

            //verifica se token de reset de senha está correto
            if (tokenEmail.Token != token)
            {
                return new Retorno()
                {
                    Codigo = 403,
                    Mensagem = "Código de reset de senha errado"
                };
            }

            //verifica se a data do token de reset de senha esta valida
            if (!VerificaDataValida(tokenEmail))
            {
                return new Retorno()
                {
                    Codigo = 403,
                    Mensagem = "Código de reset de senha expirado, por favor realize a solicitação do código de reset de senha novamente"
                };
            }

            //gera nova senha randomica
            string novaSenha = Helper.GeraNovaSenha();

            //guarda senha para enviar email
            usuario.Senha = novaSenha;

            //criptografa a senha
            usuario.Senha = criptografia.Criptografar(usuario.Senha);

            //grava senha no banco
            repositoryUsuario.AlterarUsuario(usuario);

            //envia senha por email
            return EnviaEmailComSenha(usuario, novaSenha);
        }

        private Retorno EnviaEmailComSenha(Usuario usuario, string novaSenha)
        {
            string body = HelperEmail.BodySenhaEnviada(configuration["EnderecoEmail"], usuario, novaSenha);

            string assunto = HelperEmail.AssuntoNovaSenha();

            return EnviaEmail(usuario.Email, body, assunto);
        }

        private bool VerificaDataValida(TokenEmail tokenEmail)
        {
            if (Convert.ToDateTime(tokenEmail.DataValida) <= DateTime.Today)
            {
                return false;
            }
            return true;
        }

        public Retorno EnviaEmailConfirmacao(Usuario usuario)
        {
            string body = HelperEmail.BodyConfirmacao(configuration["UrlConta"], configuration["EnderecoEmail"], usuario);

            string assunto = HelperEmail.AssuntoConfirmacao();

            return EnviaEmail(usuario.Email, body, assunto);
        }
    }
}
