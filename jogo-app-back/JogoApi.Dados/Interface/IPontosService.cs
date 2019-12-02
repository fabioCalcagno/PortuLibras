using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IPontosService
    {
        Retorno BuscaJogoUsuario(UsuarioDTO usuario);
    }
}
