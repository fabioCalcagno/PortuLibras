using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryTokenEmail
    {
        int GravarTokenEmail(TokenEmail tokenEmail);
        int DeletarTokenEmail(int tokenInserido);
        List<TokenEmail> BuscarToken(TokenEmail tokenEmail);
        int AlterarToken(TokenEmail tokenEmail);
    }
}
