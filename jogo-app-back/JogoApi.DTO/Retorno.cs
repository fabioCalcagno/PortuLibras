using System.Collections.Generic;
using System.Runtime.Serialization;

namespace JogoApi.DTO
{
    [DataContract(Name = "Retorno")]
    public class Retorno
    {
        //public Retorno()
        //{
        //    Parameters = new Dictionary<string, object>();
        //}

        [DataMember(Name = "Data")]
        public string Data { get; set; }

        [DataMember(Name = "Codigo")]
        public int Codigo { get; set; }

        [DataMember(Name = "Mensagem")]
        public string Mensagem { get; set; }

        //[DataMember(Name = "Parametro")]
        //public Dictionary<string, object> Parameters { get; set; }
    }
}


