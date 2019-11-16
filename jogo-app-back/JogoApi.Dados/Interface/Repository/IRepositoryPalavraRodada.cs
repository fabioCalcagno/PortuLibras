using JogoApi.DTO;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryPalavraRodada
    {
        void GravarPalavraRodada(PalavraRodadaDTO palavraRodada);
        NovaRodada NovaRodada(int codigoJogo, int numeroRodada);
    }
}
