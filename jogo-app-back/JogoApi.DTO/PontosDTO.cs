using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Pontos")]
    public class PontosDTO
    {
        [JsonProperty(PropertyName = "CodigoJogo")]
        public int CodigoJogo { get; set; }

        [JsonProperty(PropertyName = "CodigoUsuario")]
        public int CodigoUsuario { get; set; }

        [JsonProperty(PropertyName = "Pontos")]
        public int Pontos { get; set; }
    }
}
