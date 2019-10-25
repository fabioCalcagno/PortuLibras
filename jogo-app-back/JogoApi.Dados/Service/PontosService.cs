using System;
using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Newtonsoft.Json;

namespace JogoApi.Dados.Service
{
    public class PontosService : IPontosService
    {
        private readonly ITransacaoDao objDao;

        public PontosService(ITransacaoDao objDao)
        {
            this.objDao = objDao;
        }

        public Retorno RegistraPontos(PontosDTO pontos)
        {
            string query = Helper.QueryRegistroPontos(pontos);
            var retorno = objDao.RegistrarCadastro(query);

            pontos.CodigoJogo = retorno;

            return new Retorno() { Codigo = 200, Mensagem = "Pontos registrados", Data = JsonConvert.SerializeObject(pontos).ToString() };
        }

        public Retorno BuscaJogoUsuario(int codigoUsuario)
        {
            string query = Helper.BuscaJogoUsuario(codigoUsuario);

            return BuscaPontos(query);
        }

        public Retorno BuscaJogo(int codigoJogo)
        {
            string query = Helper.BuscaJogo(codigoJogo);

            return BuscaPontos(query);
        }

        private Retorno BuscaPontos(string query)
        {
            var lstRetorno = objDao.BuscaPontos(query);

            foreach (var retorno in lstRetorno)
            {
                retorno.UsuarioDTO.DataNascimento = Helper.AjustaDataNascimento(retorno.UsuarioDTO.DataNascimento);
            }

            if (lstRetorno.Count != 0)
            {
                return new Retorno() { Codigo = 200, Mensagem = "Busca com sucesso", Data = JsonConvert.SerializeObject(lstRetorno).ToString() };
            }
            else
            {
                return new Retorno() { Codigo = 409, Mensagem = "Busca sem registros encontrados" };
            }
        }

        public Retorno BuscaMelhores(int quantidade)
        {
            string query = Helper.BuscaMelhoresJogos(quantidade);

            return BuscaPontos(query);
        }
    }
}
