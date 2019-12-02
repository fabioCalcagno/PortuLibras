using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Rodada")]
    public class RodadaDTO
    {
        [JsonProperty(PropertyName = "CodigoRodada")]
        public int CodigoRodada { get; set; }

        [JsonProperty(PropertyName = "Numero")]
        public int Numero { get; set; }

        [JsonProperty(PropertyName = "CodigoJogo")]
        public int CodigoJogo { get; set; }
    }
}
