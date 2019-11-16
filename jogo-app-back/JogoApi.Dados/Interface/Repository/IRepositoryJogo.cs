using System.Collections.Generic;
using JogoApi.DTO;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryJogo
    {
        int CriarJogo(int codigoUsuario, int? score);
        List<JogoDTO> BuscarMelhoresPontos(int codigoUsuario);
    }
}
