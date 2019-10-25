using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IPontosService
    {
        Retorno RegistraPontos(PontosDTO pontos);
        Retorno BuscaJogoUsuario(int codigoUsuario);
        Retorno BuscaJogo(int codigoJogo);
        Retorno BuscaMelhores(int quantidade);
    }
}
