using JogoApi.Dados.Interface;
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

        public EmailService(IConfiguration configuration, ITransacaoDao objDao, ICriptografia criptografia)
        {
            this.criptografia = criptografia;
            this.configuration = configuration;
            this.objDao = objDao;
        }

        public Retorno EnviaResetEmail(string email)
        {
            string portuLibras = configuration["EnderecoEmail"];

            string query = Helper.CriarQueryBuscaUsuario(new UsuarioDTO() { Email = email });

            var lstUsuario = objDao.BuscaUsuario(query);

            if (lstUsuario.Count == 0)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Email não encontrado." };
            }

            string assunto = HelperEmail.AssuntoSenha();

            string token = HelperEmail.GeraCodigo();

            string body = HelperEmail.BodySenha(token, portuLibras);

            var usuarioEcontrado = lstUsuario.FirstOrDefault(x => x.Email == email);

            int codigo = usuarioEcontrado.CodigoUsuario;

            GravaTokenEmail(token, codigo);

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
                return new Retorno() { Codigo = 500, Mensagem = "Falha ao enviar o e-mail: " + ex.Message };
            }

        }

        private void GravaTokenEmail(string token, int codigo)
        {
            token = criptografia.Criptografar(token);

            string query = Helper.CriaQueryTokenEmail(token, codigo);

            objDao.RegistrarCadastro(query);
        }

        public Retorno ValidaTokenEmail(string email, string tokenEmail)
        {
            string queryUsuario = Helper.CriarQueryBuscaUsuario(new UsuarioDTO() { Email = email });

            var lstUsuario = objDao.BuscaUsuario(queryUsuario);

            if (lstUsuario.Count == 0)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Email não encontrado." };
            }
            var usuarioEcontrado = lstUsuario.FirstOrDefault(x => x.Email == email);

            var queryTokenEmail = Helper.CriaQueryBuscaTokenEmail(usuarioEcontrado.CodigoUsuario);

            var lstRetornoTokenEmail = objDao.BuscaTokenEmail(queryTokenEmail);

            if (lstUsuario.Count == 0)
            {
                return new Retorno() { Codigo = 404, Mensagem = "Usuário não encontrado." };
            }

            var tokenCriptografado = criptografia.Criptografar(tokenEmail);

            var retornoTokenEmail = lstRetornoTokenEmail.FirstOrDefault(x => x.Token == tokenCriptografado);

            var tokenDescriptografado = criptografia.Descriptografar(retornoTokenEmail.Token);

            if (tokenDescriptografado != tokenEmail)
            {
                return new Retorno() { Codigo = 400, Mensagem = "Token incorreto" };
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Token validado",
                Data = JsonConvert.SerializeObject(usuarioEcontrado).ToString()
            };
        }

        public Retorno EnviaEmailConfirmacao(UsuarioDTO usuario)
        {
            string body = HelperEmail.BodyConfirmacao(configuration["UrlConta"], configuration["EnderecoEmail"], usuario);

            string assunto = HelperEmail.AssuntoConfirmacao();

            return EnviaEmail(usuario.Email, body, assunto);
        }
    }
}
