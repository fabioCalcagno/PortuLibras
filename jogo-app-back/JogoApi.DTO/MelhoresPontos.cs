using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Pontos")]
    public class MelhoresPontos
    {
        [JsonProperty(PropertyName = "Posicao")]
        public int Posicao { get; set; }

        [JsonProperty(PropertyName = "Score")]
        public int Score { get; set; }
    }
}
