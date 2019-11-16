using JogoApi.Dados.Interface;
using JogoApi.Dados.Interface.Repository;
using JogoApi.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace JogoApi.Dados.Service
{
    public class JogoService : IJogoService
    {
        private IRepositoryJogo repoJogo;
        private IRepositoryPalavra repoPalavra;
        private IRepositoryRodada repoRodada;
        private IRepositoryPalavraRodada repoPalavraRodada;

        public JogoService(IRepositoryJogo repoJogo, IRepositoryPalavra repoPalavra, IRepositoryRodada repoRodada, IRepositoryPalavraRodada repoPalavraRodada)
        {
            this.repoJogo = repoJogo;
            this.repoPalavra = repoPalavra;
            this.repoRodada = repoRodada;
            this.repoPalavraRodada = repoPalavraRodada;
        }

        public Retorno NovoJogo(UsuarioDTO usuario)
        {
            //primeira rodada
            int numeroRodada = 1;

            //cria novo jogo
            var jogo = new JogoDTO();
            jogo.CodigoJogo = CriaNovoJogo(usuario.CodigoUsuario, null);

            //Monta rodada com as palavras corretas
            MontaPalavraRodada(jogo.CodigoJogo);

            //Gera nova rodada
            var novaRodada = NovaRodada(jogo.CodigoJogo, numeroRodada);

            //retornar rodada
            return new Retorno()
            {
                Codigo = 200,
                Data = JsonConvert.SerializeObject(novaRodada).ToString(),
                Mensagem = "Rodada " + novaRodada.NumeroRodada,
                Token = "FALTA"
            };
        }

        private void MontaPalavraRodada(int codigoJogo)
        {
            //Gera lista de palavras corretas para todas rodadas
            var lstPalavrasCorretas = BuscaPalavrasCorretas();

            //salva rodadas
            var lstPalavraRodada = SalvaRodadas(lstPalavrasCorretas, codigoJogo);

            //salva RodadaPalavra
            SalvarPalavraRodada(lstPalavraRodada);
        }

        private NovaRodada BuscarNovaRodada(int codigoJogo, int numeroRodada)
        {
            return repoPalavraRodada.NovaRodada(codigoJogo, numeroRodada);
        }

        private List<PalavraRodadaDTO> SalvaRodadas(List<PalavraSinalDTO> lstPalavrasCorretas, int codigoJogo)
        {
            List<PalavraRodadaDTO> lstPalavraRodada = new List<PalavraRodadaDTO>();

            int numeroRodada = 1;

            List<RodadaDTO> lstRodada = new List<RodadaDTO>();

            foreach (var palavraSinal in lstPalavrasCorretas)
            {
                var rodada = new RodadaDTO
                {
                    Numero = numeroRodada,
                    CodigoJogo = codigoJogo
                };

                rodada.CodigoRodada = repoRodada.SalvarRodada(rodada);

                lstRodada.Add(rodada);

                numeroRodada++;

                lstPalavraRodada.Add(new PalavraRodadaDTO()
                {
                    ObjRodada = rodada,
                    ObjPalavra = new PalavraDTO()
                    {
                        CodigoPalavra = palavraSinal.ObjPalavra.CodigoPalavra,
                        CodigoSinal = palavraSinal.ObjPalavra.CodigoSinal,
                        Palavra = palavraSinal.ObjPalavra.Palavra
                    }
                });
            }

            return lstPalavraRodada;
        }

        private void SalvarPalavraRodada(List<PalavraRodadaDTO> lstPalavraRodada)
        {
            foreach (var palavraRodada in lstPalavraRodada)
            {
                repoPalavraRodada.GravarPalavraRodada(palavraRodada);
            }
        }

        private List<PalavraErrada> BuscaPalavrasErradas(int codigoPalavraCorreta)
        {
            return repoPalavra.BuscarPalavrasErradas(codigoPalavraCorreta);
        }

        private List<PalavraSinalDTO> BuscaPalavrasCorretas()
        {
            return repoPalavra.BuscarPalavrasCorretas();
        }

        private int CriaNovoJogo(int codigoUsuario, int? score)
        {
            return repoJogo.CriarJogo(codigoUsuario, score);
        }

        public Retorno GerarNovaRodada(NovaRodada novaRodada)
        {
            //Gera nova rodada
            RetornoRodada retornoRodada = NovaRodada(novaRodada.CodigoJogo, novaRodada.NumeroRodada);
            
            //retornar rodada
            return new Retorno()
            {
                Codigo = 200,
                Data = JsonConvert.SerializeObject(retornoRodada).ToString(),
                Mensagem = "Rodada " + novaRodada.NumeroRodada,
                Token = "FALTA"
            };
        }

        private RetornoRodada NovaRodada(int codigoJogo, int numeroRodada)
        {
            NovaRodada rodada = BuscarNovaRodada(codigoJogo, numeroRodada);

            var lstPalavraErrada = BuscaPalavrasErradas(rodada.CodigoPalavra);

            //Monta objeto para retornar
            return new RetornoRodada()
            {
                CodigoJogo = codigoJogo,
                NumeroRodada = numeroRodada,
                PalavraCorreta = rodada.Palavra,
                Diretorio = rodada.Diretorio,
                PalavrasErradas = lstPalavraErrada
            };

        }
    }
}
