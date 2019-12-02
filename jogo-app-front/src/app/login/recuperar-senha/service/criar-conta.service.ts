import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(private http: HttpClient) { }

  private  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  url = 'http://localhost:5000/api/Email/EnviaResetSenha?email=';
  urlEnviaCodigo = 'http://localhost:5000/api/Email/ValidaTokenEmail';

  recuperarSenha(user){
      return this.http.get(this.url + user , { headers:this.headers })
  }


  enviarCodigoConfirmacaoEmail(emailPlusCodigo){
    console.log(emailPlusCodigo , 'body')
    return this.http.post(this.urlEnviaCodigo, emailPlusCodigo , {headers:this.headers} )
  }


}
