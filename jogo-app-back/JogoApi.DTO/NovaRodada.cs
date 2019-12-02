using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Jogo")]
    public class NovaRodada
    {
        [JsonProperty(PropertyName = "CodigoPalavraRodada")]
        public int CodigoPalavraRodada { get; set; }

        [JsonProperty(PropertyName = "CodigoRodada")]
        public int CodigoRodada { get; set; }

        [JsonProperty(PropertyName = "NumeroRodada")]
        public int NumeroRodada { get; set; }

        [JsonProperty(PropertyName = "CodigoJogo")]
        public int CodigoJogo { get; set; }

        [JsonProperty(PropertyName = "Score")]
        public int Score { get; set; }

        [JsonProperty(PropertyName = "CodigoPalavra")]
        public int CodigoPalavra { get; set; }

        [JsonProperty(PropertyName = "Palavra")]
        public string Palavra { get; set; }

        [JsonProperty(PropertyName = "CodigoSinal")]
        public int CodigoSinal { get; set; }

        [JsonProperty(PropertyName = "Diretorio")]
        public string Diretorio { get; set; }
    }
}
