using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "TokenEmail")]
    public class TokenEmailDTO
    {
        [JsonProperty(PropertyName = "ID_TOKEN")]
        public int CodigoToken { get; set; }

        [JsonProperty(PropertyName = "Token")]
        public string Token { get; set; }

        [JsonProperty(PropertyName = "DATAVALIDA")]
        public string DataValida { get; set; }

        [JsonProperty(PropertyName = "ID_USUARIO")]
        public int CodigoUsuario { get; set; }
    }
}
