using JogoApi.Dados.Interface;
using JogoApi.DTO;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JogoApi.Dados.Service
{
    public class AuthTokenService : IAuthTokenService
    {
        private IConfiguration configuration;

        public AuthTokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GeraTokenUsuario(UsuarioDTO usuario)
        {
            //security key
            string securityKey = configuration["ChaveToken"];

            //symetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            //adiciona claims
            var claims = new List<Claim>();
            claims.Add(new Claim("CodigoUsuario", usuario.CodigoUsuario.ToString()));
            claims.Add(new Claim("Nome", usuario.Nome.ToString()));
            claims.Add(new Claim("Sobrenome", usuario.Sobrenome.ToString()));
            claims.Add(new Claim("Email", usuario.Email.ToString()));
            claims.Add(new Claim("Username", usuario.Username.ToString()));
            claims.Add(new Claim("Ativo", usuario.Ativo.ToString()));

            //signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            //cria token
            var token = new JwtSecurityToken
                (
                    issuer: "portu.libras",
                    audience: "readers",
                    expires: DateTime.Now.AddHours(2),
                    signingCredentials: signingCredentials,
                    claims: claims
                );

            //retorna token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
