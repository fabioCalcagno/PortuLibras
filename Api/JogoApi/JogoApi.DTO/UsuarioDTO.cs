using System;
using System.Runtime.Serialization;

namespace JogoApi.DTO
{
    [DataContract(Name = "Usuario")]
    public class UsuarioDTO
    {
        [DataMember(Name = "CodigoUsuario")]
        public int CodigoUsuario { get; set; }

        [DataMember(Name = "Nome")]
        public string Nome { get; set; }

        [DataMember(Name = "Sobrenome")]
        public string Sobrenome { get; set; }

        [DataMember(Name = "Username")]
        public string Username { get; set; }

        [DataMember(Name = "Senha")]
        public string Senha { get; set; }

        [DataMember(Name = "DataNascimento")]
        public string DataNascimento { get; set; }

        [DataMember(Name = "Email")]
        public string Email { get; set; }

        [DataMember(Name = "Telefone")]
        public string Telefone { get; set; }

        public DateTime Nascimento { get; set; }
    }
}
