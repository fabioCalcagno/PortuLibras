using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryTokenEmail
    {
        int GravarTokenEmail(TokenEmailDTO tokenEmail);
        int DeletarTokenEmail(int tokenInserido);
        List<TokenEmailDTO> BuscarToken(TokenEmailDTO tokenEmail);
        int AlterarToken(TokenEmailDTO tokenEmail);
    }
}
