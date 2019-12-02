using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Palavras")]
    public class JogoPalavras
    {
        [JsonProperty(PropertyName = "CodigoAcerto")]
        public int CodigoAcerto { get; set; }

        [JsonProperty(PropertyName = "Palavra")]
        public string Palavra { get; set; }
}
}
