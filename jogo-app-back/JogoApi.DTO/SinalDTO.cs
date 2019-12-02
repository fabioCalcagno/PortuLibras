using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Sinal")]

    public class SinalDTO
    {
        [JsonProperty(PropertyName = "CodigoSinal")]
        public int CodigoSinal { get; set; }

        [JsonProperty(PropertyName = "Diretorio")]
        public string Diretorio { get; set; }
    }
}
