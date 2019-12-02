using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace JogoApi.DTO
{
    [JsonObject(Title = "Palavra_Sinal")]
    public class PalavraSinalDTO
    {
        [JsonProperty(PropertyName = "Palavra")]
        public PalavraDTO ObjPalavra { get; set; }

        [JsonProperty(PropertyName = "Sinal")]
        public SinalDTO ObjSinal { get; set; }
    }
}
