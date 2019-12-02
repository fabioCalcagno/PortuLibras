using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IJogoService
    {
        Retorno NovoJogo(UsuarioDTO usuario);
        Retorno GerarNovaRodada(NovaRodada novaRodada);
        Retorno SalvarJogo(JogoDTO jogo);
    }
}
