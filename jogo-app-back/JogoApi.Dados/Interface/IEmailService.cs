using JogoApi.DTO;

namespace JogoApi.Dados.Interface
{
    public interface IEmailService
    {
        Retorno EnviaResetSenha(string email);
        Retorno ValidaTokenEmail(ResetSenha resetSenha);
        Retorno EnviaEmail(string email, string body, string assunto);
        Retorno EnviaEmailConfirmacao(UsuarioDTO usuario);
        Retorno ReenviaResetSenha(string email);
    }
}
