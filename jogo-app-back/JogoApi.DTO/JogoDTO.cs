using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Jogo")]
    public class JogoDTO
    {
        [JsonProperty(PropertyName = "CodigoJogo")]
        public int CodigoJogo { get; set; }

        [JsonProperty(PropertyName = "Score")]
        public int Score { get; set; }

        [JsonProperty(PropertyName = "CodigoUsuario")]
        public int CodigoUsuario { get; set; }
    }
}
