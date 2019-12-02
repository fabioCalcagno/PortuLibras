using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "PalavraErrada")]
    public class PalavraErrada
    {
        [JsonProperty(PropertyName = "PalavraErrada")]
        public string Palavra { get; set; }
    }
}
