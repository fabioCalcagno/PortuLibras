using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Palavra")]
    public class PalavraDTO
    {
        [JsonProperty(PropertyName = "CodigoPalavra")]
        public int CodigoPalavra { get; set; }

        [JsonProperty(PropertyName = "Palavra")]
        public string Palavra { get; set; }

        [JsonProperty(PropertyName = "CodigoSinal")]
        public int CodigoSinal { get; set; }
    }
}
