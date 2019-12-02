using JogoApi.DTO;
using System.Collections.Generic;

namespace JogoApi.Dados.Interface.Repository
{
    public interface IRepositoryPalavra
    {
        List<PalavraSinalDTO> BuscarPalavrasCorretas();
        List<PalavraErrada> BuscarPalavrasErradas(int codigoPalavraCorreta);
    }
}
