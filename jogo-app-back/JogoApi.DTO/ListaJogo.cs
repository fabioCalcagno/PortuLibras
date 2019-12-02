using Newtonsoft.Json;
using System.Collections.Generic;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Partida")]
    public class ListaJogo
    {
        [JsonProperty(PropertyName = "Partida")]
        public List<RetornoRodada> lstRetornoRodadas { get; set; }
    }
}
