using Newtonsoft.Json;

namespace JogoApi.DTO
{
    [JsonObject(Title = "UsuarioPontos")]
    public class UsuarioPontosDTO
    {
        [JsonProperty(PropertyName = "Pontos")]
        public PontosDTO PontosDTO { get; set; }

        [JsonProperty(PropertyName = "Usuario")]
        public Usuario UsuarioDTO { get; set; }
    }
}
