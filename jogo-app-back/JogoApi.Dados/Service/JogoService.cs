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
            //cria novo jogo
            var jogo = new JogoDTO();
            jogo.CodigoJogo = CriaNovoJogo(usuario.CodigoUsuario, null);

            //Monta rodada com as palavras corretas
            MontaPalavraRodada(jogo.CodigoJogo);

            //Gera partida
            var listaJogo = NovaPartida(jogo.CodigoJogo);

            //Gera nova rodada
            //RetornoRodada novaRodada = NovaRodada(jogo.CodigoJogo, numeroRodada);

            //retornar rodada
            return new Retorno()
            {
                Codigo = 200,
                Data = JsonConvert.SerializeObject(listaJogo).ToString(),
                Mensagem = "Partida gerada com sucesso!",
                Token = "FALTA"
            };
        }

        private ListaJogo NovaPartida(int codigoJogo)
        {
            var lstRetornoRodada = new List<RetornoRodada>();
            for (int numeroRodada = 1; numeroRodada < 16; numeroRodada++)
            {
                //Gera nova rodada
                RetornoRodada novaRodada = NovaRodada(codigoJogo, numeroRodada);
                lstRetornoRodada.Add(novaRodada);
            }

            ListaJogo listaJogo = new ListaJogo();

            listaJogo.lstRetornoRodadas = lstRetornoRodada;

            return listaJogo;
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

            List<JogoPalavras> lstPalavras = new List<JogoPalavras>();

            var palavras = new JogoPalavras
            {
                Palavra = rodada.Palavra,
                CodigoAcerto = 1
            };

            lstPalavras.Add(palavras);

            var lstPalavraErrada = BuscaPalavrasErradas(rodada.CodigoPalavra);


            foreach (var palavraErrada in lstPalavraErrada)
            {
                palavras = new JogoPalavras
                {
                    CodigoAcerto = 0,
                    Palavra = palavraErrada.Palavra
                };

                lstPalavras.Add(palavras);
            }

            //Randomiza a ordem das palavras
            lstPalavras.Shuffle();

            //Monta objeto para retornar
            return new RetornoRodada()
            {
                CodigoJogo = codigoJogo,
                NumeroRodada = numeroRodada,
                Diretorio = rodada.Diretorio,
                Palavras = lstPalavras
            };

        }
    }
}
