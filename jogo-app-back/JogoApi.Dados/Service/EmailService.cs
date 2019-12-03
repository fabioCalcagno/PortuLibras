using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using JogoApi.Util;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace JogoApi.Dados.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;
        private readonly IRepositoryUsuario repositoryUsuario;
        private readonly IRepositoryTokenEmail repositoryTokenEmail;
        private readonly IAuthTokenService authService;

        public EmailService(IConfiguration configuration, IRepositoryUsuario repositoryUsuario, IRepositoryTokenEmail repositoryTokenEmail, IAuthTokenService authService)
        {
            this.configuration = configuration;
            this.repositoryUsuario = repositoryUsuario;
            this.repositoryTokenEmail = repositoryTokenEmail;
            this.authService = authService;
        }

        public Retorno EnviaResetSenha(string email)
        {
            if(email.Contains("\""))
            {
                email = email.Replace("\"", "");
            }

            //buscar usuario por email
            var usuario = new UsuarioDTO()
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

            var tokenEmail = new TokenEmailDTO()
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
                tokenEmail = BuscarTokenEmail(new TokenEmailDTO() { CodigoUsuario = tokenEmail.CodigoUsuario });

                //envia email com novo token e retorna mensagem
                return MontaEmailSenha(tokenEmail, usuarioEncontrado.Email);
            }

            tokenEmail = new TokenEmailDTO()
            {
                CodigoUsuario = usuarioEncontrado.CodigoUsuario,
                Token = token,
                //gera data de expiracao adicionando 2 horas da atual
                DataValida = DateTime.Now.AddHours(2).ToString("yyyy-MM-dd HH:mm:ss")
            };

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

        private UsuarioDTO BuscaUsuario(UsuarioDTO usuario)
        {
            var lstUsuario = repositoryUsuario.ListarUsuario(usuario);
            return lstUsuario.FirstOrDefault(encontrado => encontrado.Email == usuario.Email.ToUpper());
        }

        private bool VerificaTokenExiste(TokenEmailDTO tokenEmail)
        {
            if (tokenEmail == null) return false; 
            return true;
        }

        private TokenEmailDTO BuscarTokenEmail(TokenEmailDTO tokenEmail)
        {
            var lstTokenEmail = repositoryTokenEmail.BuscarToken(tokenEmail);

            return lstTokenEmail.FirstOrDefault(encontrado => encontrado.CodigoUsuario == tokenEmail.CodigoUsuario);
        }

        private Retorno MontaEmailSenha(TokenEmailDTO tokenEmail, string email)
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

        public Retorno ValidaTokenEmail(ResetSenha resetSenha)
        {
            //busca usuario por email e username
            var usuario = BuscaUsuario(new UsuarioDTO() { Email = resetSenha.Email });

            //verifica se email existe
            if (usuario == null)
            {
                return new Retorno() { Codigo = 400, Mensagem = "Email não encontrado." };
            }

            //busca token do usuario
            var tokenEmail = BuscarTokenEmail(new TokenEmailDTO() { CodigoUsuario = usuario.CodigoUsuario });

            //verifica existencia do token
            if (tokenEmail == null)
            {
                return new Retorno() { Codigo = 400, Mensagem = "Falha ao recuperar o código de reset de senha, por favor gere o código de reset de senha novamente" };
            }

            //verifica se token de reset de senha está correto
            if (tokenEmail.Token != resetSenha.CodigoReset)
            {
                return new Retorno()
                {
                    Codigo = 400,
                    Mensagem = "Código de reset de senha errado"
                };
            }

            //verifica se a data do token de reset de senha esta valida
            if (!VerificaDataValida(tokenEmail))
            {
                return new Retorno()
                {
                    Codigo = 400,
                    Mensagem = "Código de reset de senha expirado, por favor realize a solicitação do código de reset de senha novamente"
                };
            }

            string token = authService.GeraTokenUsuario(usuario);


            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Código de reset de senha correto",
                Token = token
            };
        }

        private bool VerificaDataValida(TokenEmailDTO tokenEmail)
        {
            if (Convert.ToDateTime(tokenEmail.DataValida) <= DateTime.Today)
            {
                return false;
            }
            return true;
        }

        public Retorno EnviaEmailConfirmacao(UsuarioDTO usuario)
        {
            string body = HelperEmail.BodyConfirmacao(configuration["UrlConta"], configuration["EnderecoEmail"], usuario);

            string assunto = HelperEmail.AssuntoConfirmacao();

            return EnviaEmail(usuario.Email, body, assunto);
        }

        public Retorno ReenviaResetSenha(string email)
        {
            if (email.Contains("\""))
            {
                email = email.Replace("\"", "");
            }

            var usuario = BuscaUsuario(new UsuarioDTO() { Email = email });

            //busca novo token alterado
            var tokenEmail = BuscarTokenEmail(new TokenEmailDTO() { CodigoUsuario = usuario.CodigoUsuario });

            //envia email com novo token e retorna mensagem
            return MontaEmailSenha(tokenEmail, usuario.Email);
        }
    }
}
