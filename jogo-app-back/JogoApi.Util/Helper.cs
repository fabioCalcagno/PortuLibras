using JogoApi.DTO;
using System;
using System.Text;

namespace JogoApi.Dados.Service
{
    public static class Helper
    {
        public static string CriarQueryEdicao(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] UPDATE[dbo].[USUARIO] SET [NOME] = '");
            builder.Append(usuario.Nome);
            builder.Append("', [SOBRENOME] = '");
            builder.Append(usuario.Sobrenome);
            builder.Append(" ', [DT_NASC] = '");
            builder.Append(usuario.DataNascimento);
            builder.Append(" ', [EMAIL] = '");
            builder.Append(usuario.Email);
            builder.Append(" ', [LOGIN] = '");
            builder.Append(usuario.Username);
            builder.Append(" ', [SENHA] = '");
            builder.Append(usuario.Senha);
            builder.Append("' WHERE ID_USUARIO = ");
            builder.Append(usuario.CodigoUsuario);

            return builder.ToString();
        }

        public static string BuscaJogoUsuario(int codigoUsuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE[Libras] SELECT J.[ID_JOGO],J.[SCORE] , J.[ID_USUARIO], U.[NOME], U.[SOBRENOME] ,U.[DT_NASC], U.[EMAIL], U.[LOGIN], Tel.[TELEFONE] FROM[dbo].[JOGO] AS J LEFT JOIN[dbo].[USUARIO] AS U ON J.[ID_USUARIO] = U.[ID_USUARIO] LEFT JOIN[dbo].[TELEFONE] AS Tel ON U.[ID_USUARIO] = Tel.[ID_USUARIO] WHERE U.[ID_USUARIO] = ");

            builder.Append(codigoUsuario.ToString());

            return builder.ToString();
        }

        public static string BuscaJogo(int codigoJogo)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE[Libras] SELECT J.[ID_JOGO],J.[SCORE] , J.[ID_USUARIO], U.[NOME], U.[SOBRENOME] ,U.[DT_NASC], U.[EMAIL], U.[LOGIN], Tel.[TELEFONE] FROM[dbo].[JOGO] AS J LEFT JOIN[dbo].[USUARIO] AS U ON J.[ID_USUARIO] = U.[ID_USUARIO] LEFT JOIN[dbo].[TELEFONE] AS Tel ON U.[ID_USUARIO] = Tel.[ID_USUARIO] WHERE J.[ID_JOGO] = ");

            builder.Append(codigoJogo.ToString());

            return builder.ToString();
        }

        public static string BuscaMelhoresJogos(int quantidade)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE[Libras] SELECT ");

            if (quantidade != 0)
            {
                builder.Append(" TOP ");
                builder.Append(quantidade.ToString());
            }

            builder.Append(" J.[ID_JOGO],J.[SCORE] , J.[ID_USUARIO], U.[NOME], U.[SOBRENOME] ,U.[DT_NASC], U.[EMAIL], U.[LOGIN], Tel.[TELEFONE] FROM[dbo].[JOGO] AS J LEFT JOIN[dbo].[USUARIO] AS U ON J.[ID_USUARIO] = U.[ID_USUARIO] LEFT JOIN[dbo].[TELEFONE] AS Tel ON U.[ID_USUARIO] = Tel.[ID_USUARIO] ORDER BY J.[SCORE] DESC;");

            return builder.ToString();
        }

        public static string QueryRegistroPontos(PontosDTO pontos)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE[Libras] INSERT INTO[dbo].[JOGO] ([SCORE] ,[ID_USUARIO]) VALUES (");
            builder.Append(pontos.Pontos.ToString());
            builder.Append(", ");
            builder.Append(pontos.CodigoUsuario.ToString());
            builder.Append(") SELECT SCOPE_IDENTITY()");

            return builder.ToString();
        }

        public static string CriarQueryEdicaoTelefone(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] UPDATE[dbo].[TELEFONE] SET [TELEFONE] = ");
            builder.Append(usuario.Telefone);
            builder.Append(" WHERE ID_USUARIO = ");
            builder.Append (usuario.CodigoUsuario);

            return builder.ToString();
        }

        public static string CriarQueryUsuario(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] DECLARE @UsuarioID int; INSERT INTO [dbo].[USUARIO] ([NOME], [SOBRENOME], [DT_NASC], [EMAIL], [LOGIN], [SENHA] ) OUTPUT Inserted.ID_USUARIO VALUES('");
            builder.Append(usuario.Nome);
            builder.Append("', '");
            builder.Append(usuario.Sobrenome);
            builder.Append("', '");
            builder.Append(usuario.DataNascimento);
            builder.Append("', '");
            builder.Append(usuario.Email);
            builder.Append("', '");
            builder.Append(usuario.Username);
            builder.Append("', '");
            builder.Append(usuario.Senha);
            builder.Append("') SELECT @UsuarioID = scope_identity() INSERT INTO [dbo].[TELEFONE] ([TELEFONE], [ID_USUARIO]) VALUES ('");

            builder.Append(usuario.Telefone);
            builder.Append("', @UsuarioID );");

            return builder.ToString();
        }

        public static string AjustaDataNascimento(string nascimento)
        {
            return Convert.ToDateTime(nascimento).ToString("dd/MM/yyyy");
        }

        public static string DataNascimentoBanco(string nascimento)
        {
            var date = DateTime.ParseExact(nascimento, "dd/MM/yyyy", null).ToString();

            return Convert.ToDateTime(date).ToString("yyyy-MM-dd");
        }

        public static string CriarQueryBuscaUsuario(UsuarioDTO usuario)
        {
            string query = @"USE [Libras] SELECT u.[ID_USUARIO], u.[NOME], u.[SOBRENOME], u.[DT_NASC], u.[EMAIL], u.[LOGIN], u.[SENHA], t.TELEFONE FROM [dbo].[USUARIO] as u LEFT JOIN [dbo].[TELEFONE] as t ON u.ID_USUARIO = t.ID_USUARIO ";

            string where = "WHERE";

            if (usuario.CodigoUsuario != 0)
            {
                where += " u.ID_USUARIO = " + usuario.CodigoUsuario.ToString();
            }

            if (!String.IsNullOrEmpty(usuario.Nome))
            {
                if (where.Length == 5)
                {
                    where += (" u.NOME = '" + usuario.Nome + "'");
                }
                else
                {
                    where += (" AND u.NOME = '" + usuario.Nome + "'");
                }
            }

            if (!String.IsNullOrEmpty(usuario.Sobrenome))
            {
                if (where.Length == 5)
                {
                    where += (" u.SOBRENOME = '" + usuario.Sobrenome + "'");
                }
                else
                {
                    where += (" AND u.SOBRENOME = '" + usuario.Sobrenome + "'");
                }
            }

            if (!String.IsNullOrEmpty(usuario.DataNascimento))
            {
                if (where.Length == 5)
                {
                    where += (" u.DT_NASC = '" + usuario.DataNascimento + "'");
                }
                else
                {
                    where += (" AND u.DT_NASC = '" + usuario.DataNascimento + "'");
                }
            }

            if (!String.IsNullOrEmpty(usuario.Email))
            {
                if (where.Length == 5)
                {
                    where += (" u.EMAIL = '" + usuario.Email + "'");
                }
                else
                {
                    where += (" AND u.EMAIL = '" + usuario.Email + "'");
                }
            }

            if (!String.IsNullOrEmpty(usuario.Username))
            {
                if (where.Length == 5)
                {
                    where += (" u.LOGIN = '" + usuario.Username + "'");
                }
                else
                {
                    where += (" AND u.LOGIN = '" + usuario.Username + "'");
                }
            }

            if (!String.IsNullOrEmpty(usuario.Telefone))
            {
                if (where.Length == 5)
                {
                    where += (" t.TELEFONE = '" + usuario.Telefone + "'");
                }
                else
                {
                    where += (" AND t.TELEFONE = '" + usuario.Telefone + "'");
                }
            }

            if (where.Length != 0)
            {
                return query + where;
            }
            else
            {
                return query;
            }
        }

        public static string CriarQueryDelete(int codigo)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append("USE [Libras] DELETE FROM [dbo].[USUARIO] WHERE ID_USUARIO = ");
            builder.Append(codigo);
            return builder.ToString();
        }
    }
}
