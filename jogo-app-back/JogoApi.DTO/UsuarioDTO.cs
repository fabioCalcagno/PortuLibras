using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Usuario")]
    public class UsuarioDTO
    {
        [JsonProperty(PropertyName = "CodigoUsuario")]
        public int CodigoUsuario { get; set; }

        [JsonProperty(PropertyName = "Nome")]
        public string Nome { get; set; }

        [JsonProperty(PropertyName = "Sobrenome")]
        public string Sobrenome { get; set; }

        [JsonProperty(PropertyName = "Email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Username")]
        public string Username { get; set; }

        [JsonProperty(PropertyName = "Senha")]
        public string Senha { get; set; }

        [JsonProperty(PropertyName = "Ativo")]
        public bool? Ativo { get; set; }        
    }
}
