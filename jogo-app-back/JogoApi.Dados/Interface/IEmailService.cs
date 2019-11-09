using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IEmailService
    {
        Retorno EnviaResetSenha(string email);
        Retorno ValidaTokenEmail(string email, string tokenEmail);
        Retorno EnviaEmail(string email, string body, string assunto);
        Retorno EnviaEmailConfirmacao(Usuario usuario);
    }
}
