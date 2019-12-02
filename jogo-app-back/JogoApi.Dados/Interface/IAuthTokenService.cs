using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IAuthTokenService
    {
        string GeraTokenUsuario(UsuarioDTO usuario);
    }
}
