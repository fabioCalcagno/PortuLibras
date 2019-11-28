using System.Collections.Generic;
using System.Globalization;
using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using Newtonsoft.Json;

namespace JogoApi.Dados.Service
{
    public class PontosService : IPontosService
    {
        private readonly IRepositoryJogo repoJogo;

        public PontosService(IRepositoryJogo repoJogo)
        {
            this.repoJogo = repoJogo;
        }

        public Retorno BuscaJogoUsuario(UsuarioDTO usuario)
        {
            int posicao = 1;

            var lstJogos = BuscaMelhoresPontos(usuario.CodigoUsuario);

            var lstMelhores = new List<MelhoresPontos>();

            foreach(var jogo in lstJogos)
            {
                var melhores = new MelhoresPontos
                {
                    Posicao = posicao,
                    Score = jogo.Score
                };

                lstMelhores.Add(melhores);

                posicao++;
            }

            return new Retorno()
            {
                Codigo = 200,
                Mensagem = "Melhores jogos",
                Data = JsonConvert.SerializeObject(lstMelhores).ToString(),
            };
        }

        private List<JogoDTO> BuscaMelhoresPontos(int codigoUsuario)
        {
            return repoJogo.BuscarMelhoresPontos(codigoUsuario);
        }
    }
}
