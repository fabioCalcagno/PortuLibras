import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../../../auth-services/header-token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(private http: HttpClient, private AuthTokenService:AuthTokenService) { }

  private  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.AuthTokenService.getLocalStorageToken()
  })

  private  headers1= new HttpHeaders({
    'Content-Type': 'application/json'
  })


  url = 'http://localhost:5000/api/Email/EnviaResetSenha?email=';
  urlEnviaCodigo = 'http://localhost:5000/api/Email/ValidaTokenEmail';
  urlAlterarSenha = 'http://localhost:5000/api/Usuario/AlterarSenha'

CodigoUsuario:any;

  recuperarSenha(user){
      return this.http.get(this.url + user , { headers:this.headers })
  }


  enviarCodigoConfirmacaoEmail(emailPlusCodigo){
    console.log(emailPlusCodigo , 'body')
    return this.http.post(this.urlEnviaCodigo, emailPlusCodigo , {headers:this.headers1} )
  }


  cadastrarNovaSenha(body){
    console.log('isso é o que foi enviado as senhas' , body)
    return this.http.post(this.urlAlterarSenha, body, {headers:this.headers}  )
  }


}
