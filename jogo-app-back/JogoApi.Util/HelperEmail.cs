using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace JogoApi.Util
{
    public static class HelperEmail
    {
        public static string GeraCodigo()
        {
            Random random = new Random();
            return random.Next(1000, 9999).ToString();
        }

        public static string BodySenha(string token, string portuLibras)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("Olá,<br/><br/>");
            builder.Append("Recebemos um pedido de redefinição de sua senha do <b>PortuLibras</b>.<br/><br/>");
            builder.Append("Por favor, insira o código abaixo em nosso site para confirmar a redefinição.<br/><br/><b>");
            builder.Append(token);
            builder.Append("</b><br/><br/>O código é válido por <b>2 horas</b>.<br/><br/>");
            builder.Append("Esta é uma mensagem automática, caso você não tenha feito essa solicitação ou se precisar de ajuda, entre em contato com a nossa equipe: <b><br/><br/>");
            builder.Append(portuLibras);
            builder.Append("<br/><br/></b>Agradecemos o contato.");

            return builder.ToString();
        }

        public static string AssuntoSenha()
        {
            return "PortuLibras - Código de geração da senha";
        }

        public static string BodyConfirmacao(string link, string portuLibras, Usuario usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("Olá, ");
            builder.Append(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuario.Nome.ToLower()));
            builder.Append(" ");
            builder.Append(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuario.Sobrenome.ToLower()));
            builder.Append("<br/><br/>Bem vindo ao <b>PortuLibras</b>.<br/><br/>");
            builder.Append("Por favor, para prosseguir confirme sua conta acessando o link abaixo.<br/><br/><b>");
            builder.Append(link + usuario.Email.ToLower());
            builder.Append("Esta é uma mensagem automática, caso você não tenha feito essa solicitação ou se precisar de ajuda, entre em contato com a nossa equipe: <b><br/><br/>");
            builder.Append(portuLibras);
            builder.Append("<br/><br/></b>Agradecemos o contato.");

            return builder.ToString();
        }

        public static string AssuntoConfirmacao()
        {
            return "PortuLibras - Confirmação da conta";
        }

        public static string BodySenhaEnviada(string portuLibras, Usuario usuario, string novaSenha)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("Olá, ");
            builder.Append(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuario.Nome.ToLower()));
            builder.Append(" ");
            builder.Append(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuario.Sobrenome.ToLower()));
            builder.Append("<br/><br/>Sua nova senha é: <b>");
            builder.Append(novaSenha);
            builder.Append("</b><br/><br/>");
            builder.Append("Esta é uma mensagem automática, caso você não tenha feito essa solicitação ou se precisar de ajuda, entre em contato com a nossa equipe: <b><br/><br/>");
            builder.Append(portuLibras);
            builder.Append("<br/><br/></b>Agradecemos o contato.");

            return builder.ToString();
        }

        public static string AssuntoNovaSenha()
        {
            return "PortuLibras - Nova senha";
        }
    }
}
