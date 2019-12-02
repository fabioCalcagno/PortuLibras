using System.Runtime.Serialization;

namespace JogoApi.DTO
{
    [DataContract(Name = "Retorno")]
    public class Retorno
    {
        [DataMember(Name = "Data")]
        public string Data { get; set; }

        [DataMember(Name = "Codigo")]
        public int Codigo { get; set; }

        [DataMember(Name = "Mensagem")]
        public string Mensagem { get; set; }

        [DataMember(Name = "Token")]
        public string Token { get; set; }
    }
}


