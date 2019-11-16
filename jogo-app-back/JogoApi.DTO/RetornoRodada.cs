﻿using Newtonsoft.Json;
using System.Collections.Generic;

namespace JogoApi.DTO
{
    [JsonObject(Title = "NovaRodada")]
    public class RetornoRodada
    {
        [JsonProperty(PropertyName = "CodigoJogo")]
        public int CodigoJogo { get; set; }

        [JsonProperty(PropertyName = "NumeroRodada")]
        public int NumeroRodada { get; set; }

        [JsonProperty(PropertyName = "PalavraCorreta")]
        public string PalavraCorreta { get; set; }

        [JsonProperty(PropertyName = "Diretorio")]
        public string Diretorio { get; set; }

        [JsonProperty(PropertyName = "PalavrasErradas")]
        public List<PalavraErrada> PalavrasErradas { get; set; }
    }
}
