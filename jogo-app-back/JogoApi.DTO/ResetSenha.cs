using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "InfoTokenEmail")]
    public class ResetSenha
    {
        [JsonProperty(PropertyName = "Email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "CodigoReset")]
        public string CodigoReset { get; set; }
    }
}
