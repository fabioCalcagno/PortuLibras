using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IEmailService
    {
        Retorno EnviaResetEmail(string email);
        Retorno ValidaTokenEmail(string email, string tokenEmail);
        Retorno EnviaEmail(string email, string body, string assunto);
        Retorno EnviaEmailConfirmacao(UsuarioDTO usuario);
    }
}
