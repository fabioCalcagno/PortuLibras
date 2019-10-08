using JogoApi.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace JogoApi.Dados.Service
{
    public static class QueryBuilder
    {
        public static string CriarQueryEdicao(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] UPDATE[dbo].[USUARIO] SET ");
            builder.Append("[NOME] = '" + usuario.Nome + "',");
            builder.Append(" [SOBRENOME] = '" + usuario.Sobrenome + "',");
            builder.Append(" [DT_NASC] = '" + usuario.DataNascimento + "',");
            builder.Append(" [EMAIL] = '" + usuario.Email + "',");
            builder.Append(" [LOGIN] = '" + usuario.Username + "',");
            builder.Append(" [SENHA] = '" + usuario.Senha + "'");
            builder.Append(" WHERE ID_USUARIO = " + usuario.CodigoUsuario);

            return builder.ToString();
        }

        public static string CriarQueryEdicaoTelefone(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] UPDATE[dbo].[TELEFONE] SET ");
            builder.Append("[TELEFONE] = " + usuario.Telefone);
            builder.Append(" WHERE ID_USUARIO = " + usuario.CodigoUsuario);

            return builder.ToString();
        }

        public static string CriarQueryUsuario(UsuarioDTO usuario)
        {
            StringBuilder builder = new StringBuilder();

            builder.Append("USE [Libras] ");
            builder.Append("DECLARE @UsuarioID int; ");
            builder.Append("INSERT INTO [dbo].[USUARIO] ");
            builder.Append("( ");
            builder.Append("[NOME], ");
            builder.Append("[SOBRENOME], ");
            builder.Append("[DT_NASC], ");
            builder.Append("[EMAIL], ");
            builder.Append("[LOGIN], ");
            builder.Append("[SENHA]");
            builder.Append(") ");
            builder.Append("VALUES ");
            builder.Append("( ");
            builder.Append("'" + usuario.Nome + "', ");
            builder.Append("'" + usuario.Sobrenome + "', ");
            builder.Append("'" + usuario.DataNascimento + "', ");
            builder.Append("'" + usuario.Email + "', ");
            builder.Append("'" + usuario.Username + "', ");
            builder.Append("'" + usuario.Senha + "'");
            builder.Append(") ");
            builder.Append("SELECT @UsuarioID = scope_identity() ");
            builder.Append("INSERT INTO [dbo].[TELEFONE] ");
            builder.Append("( ");
            builder.Append("[TELEFONE], ");
            builder.Append("[ID_USUARIO]");
            builder.Append(") ");
            builder.Append("VALUES ");
            builder.Append("( ");
            builder.Append("'" + usuario.Telefone + "', ");
            builder.Append("@UsuarioID ");
            builder.Append("); ");

            return builder.ToString();
        }

        public static string CriarQueryBusca(UsuarioDTO usuario)
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
            builder.Append("USE [Libras] DELETE FROM [dbo].[USUARIO] WHERE ID_USUARIO = " + codigo);
            return builder.ToString();
        }
    }
}
