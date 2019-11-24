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

  url = 'http://localhost:5000/api/Email/EnviaResetSenha?email='

  recuperarSenha(user){
      return this.http.get(this.url + user , { headers:this.headers })
  }



}
